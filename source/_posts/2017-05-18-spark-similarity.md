---
title: Spark 计算文章相似度
date: 2017-05-18 14:17:01
tags: [spark, machine learning]
---
如何使用 Spark 并行计算文章与文章之间的相似度？

<!-- more -->

# 计算TF-IDF

Term frequency-inverse document frequency（词频-逆文档频率）是一个向量化的标识，用于反应一个术语在整篇文档中的重要性。

用 t 表示一个术语(term)， d 表示文档(document)，D 表示语料库(corpus)。

\( TF(t,d) \) Term Frequency 表示**术语t**在文档d中**的个数**。

\( DF(t, D) \) Document Frenquency 表示在语料库中包含术语t的**文档的个数**。

逆文档频率是一个数字，用于测量一个术语提供了多大的信息量。

  $$ IDF(T, D) = log \frac{|D|+1}{DF(t,D)+1} $$ 

也就是，

  $$ 逆文档频率 = log \frac{语料库的文档个数+1}{包含术语t的文档个数+1} $$

也就是说，包含术语t的文档个数越多，逆文档频率越小，加一是为了避免除0。TD-IDF 度量可以简单的表示为TF和IDF的乘积：

  $$ TFIDF(t, d, D) = TF(t,d)*IDF(T,D) $$

TF-IDF 表示了一个术语在文章中的重要程度，如果将一篇文章中TF-IDF组合起来，就构成了一个向量，同时，算出另外一篇文章的TF-IDF，将两篇文章的TF-IDF向量的相同词语分别对应同一个维度，再用余弦定理计算出两篇文章的余弦值，余弦值越大（最大1，向量重合），说明这两篇文章越相似。

**TF**: 在 Spark 中，可以使用`HashingTF` 和 `CountVectorizer` 来计算TF（词频）。

**IDF**: 在 Spark 中，使用`IDF`类来结算IDF从而计算出TF-IDF。

```java
//计算tf
        CountVectorizerModel countVectorizerModel = new CountVectorizer().setInputCol("words").setOutputCol("rawFeatures").fit(wrappedWords);
        Dataset<Row> featurizedData = countVectorizerModel.transform(wrappedWords);

        //计算idf
        IDF idf = new IDF().setInputCol("rawFeatures").setOutputCol("features");
        IDFModel idfModel = idf.fit(featurizedData);

        //计算tf-idf
        Dataset<Row> rescaledData = idfModel.transform(featurizedData);
```

# 计算余弦相似度

计算出 TF-IDF 后，将其转换为一个`BlockMatrix`矩阵。


	1 0 2.52078447201548 0 0 0 2.004684436494304 2.000347299268466 0 2.228387042742021 2.228387042742023 0 0 0 0 0 0
	0 2.857738033247042 0 0 2.619965104088255 0 2.004684436494304 2.000347299268466 0 2.228387042742021 2.228387042742023 0 0 0 0 0 0
	0 2.857738033247042 0 2.061393766919624 0 0 2.004684436494304 0 0 2.228387042742021 2.228387042742023 0 0 0 0 0 0
	1 0 0 2.061393766919624 2.619965104088255 0 2.004684436494304 2.000347299268466 0 0 0 0 2.055002875864414 0 0 0 0
	1 2.857738033247042 0 2.061393766919624 2.619965104088255 0 2.004684436494304 0 0 0 0 0 2.055002875864414 0 0 0 0


计算出矩阵后，将其倒置。

倒置后将`BlockMatrix`转换为`RowMatrix`并使用 RowMatrix 的 columnSimilarities 这个方法将计算出每一列的余弦相似度，其结果也是一个矩阵(CoordinateMatrix)。矩阵的横坐标i代表其中某一列，纵坐标j代表另外一列，其余弦值结果就是Entry(i,j)。

```java
 //将稀疏向量转变为密集向量
        JavaRDD<Vector> features = (JavaRDD<Vector>)rescaledData.toJavaRDD().map(new Function<Row, Vector>() {
            @Override
            public Vector call(Row row) throws Exception {
                SparseVector features = row.getAs("features");
                return Vectors.dense(features.toArray());
            }
        });

        //构建带索引的矩阵，用于转化为分块向量
        JavaRDD<IndexedRow> indices = (JavaRDD<IndexedRow>)features.zipWithIndex().map(new Function<Tuple2<Vector, Long>, IndexedRow>() {

            @Override
            public IndexedRow call(Tuple2<Vector, Long> t) throws Exception {
                return new IndexedRow(t._2(), t._1());
            }
        });

        //得到分块矩阵的转置
        BlockMatrix blockMatrix = new IndexedRowMatrix(indices.rdd()).toBlockMatrix().transpose();

        //得到行矩阵
        RowMatrix rowMatrix = blockMatrix.toCoordinateMatrix().toRowMatrix();

        //计算行矩阵的列相似度，获得带坐标的相似度矩阵（结果输出）
        CoordinateMatrix res = rowMatrix.columnSimilarities();
```

计算出余弦值结果后再将通过文章id和i、j的映射取出对应的文章id，文章与文章的相似度也就能保存在数据库中了。

```java
 //将相似度矩阵转换，并存储数据库。
        JavaRDD<Document> documents = (JavaRDD<Document>)res.entries().toJavaRDD().map(new Function<MatrixEntry, Document>() {
            @Override
            public Document call(MatrixEntry entry) throws Exception {
                Document d = new Document();
                d.put("id1", ids.get(new Long(entry.i()).intValue()));
                d.put("id2", ids.get(new Long(entry.j()).intValue()));
                d.put("score", entry.value());
                return d;
            }
        });
```

[感谢 databricks 的文章](https://databricks.com/blog/2014/10/20/efficient-similarity-algorithm-now-in-spark-twitter.html)

columnSimilarites 计算余弦相似度采用TWITTER的 DIMSUM 算法。



