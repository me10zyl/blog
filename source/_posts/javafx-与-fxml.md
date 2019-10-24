---
title: javafx 与 fxml
date: 2019-10-24 10:19:20
tags: [java,javafx]
---
javafx 使用 fxml 的一个例子。
<!--more-->
main:
```java
public class GUIMain extends Application {
	@Override
	public void start(Stage stage) throws Exception {
		// Create the FXMLLoader
		FXMLLoader loader = new FXMLLoader();
		// Path to the FXML File
		String fxmlDocPath = "main.fxml";
		//FileInputStream fxmlStream = new FileInputStream(fxmlDocPath);

		// Create the Pane and all Details
		final ClassLoader contextClassLoader = Thread.currentThread().getContextClassLoader();
		Pane root = (Pane) loader.load(contextClassLoader.getResourceAsStream(fxmlDocPath));

		// Create the Scene
		Scene scene = new Scene(root);
		// Set the Scene to the Stage
		stage.setScene(scene);
		// Set the Title to the Stage
		stage.setTitle("音频剪切工具");
		// Display the Stage
		stage.show();


		stage.setOnCloseRequest(e->{
			GUIController guiController = loader.getController();
			final Map<String, String> storeValues = guiController.getStoreValues();
			Properties p = new Properties();
			p.putAll(storeValues);
			try {
				p.store(new OutputStreamWriter(new FileOutputStream("audiocutter.properties"),StandardCharsets.UTF_8), "音频剪切工具配置文件");
			} catch (IOException e1) {
				e1.printStackTrace();
			}
		});
	}
}
```
controller:
```java
public class GUIController implements Initializable {

    @FXML
    ChoiceBox<String> choice1;
    @FXML
    TextField input1;
    @FXML
    TextField input2;
    @FXML
    TextField input3;

    public Map<String, String> getStoreValues(){
        final HashMap<String, String> str = new HashMap<>();
        String cutDirection = choice1.getValue();
        String inputDir = input1.getText();
        String outDir = input2.getText();
        String sec = input3.getText();
        str.put("inputDir", inputDir);
        str.put("outDir", outDir);
        str.put("cutDirection", cutDirection);
        str.put("sec", sec);
        return str;
    }

    public void startProcess(){
        try {
            String cutDirection = (String) choice1.getValue();
            String inputDir = input1.getText();
            String outDir = input2.getText();
            String sec = input3.getText();
            if (!(inputDir != null && !inputDir.equals("") && outDir != null && !outDir.equals("") && sec != null && !sec.equals(""))) {
                Alert alert = new Alert(Alert.AlertType.WARNING, "请填写所有输入框", ButtonType.YES);
                alert.showAndWait();
                return;
            }
            if (cutDirection.equals("剪切前面")) {
                sec = "-" + sec;
            }
            AudioCutter.cutAudio(inputDir, outDir, Float.parseFloat(sec));
            Alert alert = new Alert(Alert.AlertType.INFORMATION, "处理完毕", ButtonType.YES);
            alert.showAndWait();
        }catch (Exception e){
            e.printStackTrace();
            Alert alert = new Alert(Alert.AlertType.ERROR, "出错：" + e.getMessage(), ButtonType.YES);
            alert.showAndWait();
            return;
        }
    }

    public void browseInput(){
        final File file = showBrowseDir();
        if(file != null){
            input1.setText(file.getPath());
        }
    }

    public void browseOutput(){
        final File file = showBrowseDir();
        if(file != null){
            input2.setText(file.getPath());
        }
    }

    private File showBrowseDir() {
        DirectoryChooser dirChooser = new DirectoryChooser();
        dirChooser.setTitle("选择文件夹");
        final File file = dirChooser.showDialog(null);
        return file;
    }


    @Override
    public void initialize(URL location, ResourceBundle resources) {
        choice1.setItems(FXCollections.observableArrayList("剪切前面", "剪切后面"));
        choice1.setValue("剪切后面");

        Properties properties = new Properties();
        try {
            properties.load(new FileInputStream("audiocutter.properties"));
            input1.setText(properties.getProperty("inputDir"));
            input2.setText(properties.getProperty("outDir"));
            input3.setText(properties.getProperty("sec"));
            choice1.setValue(properties.getProperty("cutDirection"));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

```

fxml:
```xml
<?xml version="1.0" encoding="UTF-8"?>

<?import java.lang.*?>
<?import javafx.scene.control.*?>
<?import javafx.scene.layout.*?>

<Pane maxHeight="-Infinity" maxWidth="-Infinity" minHeight="-Infinity" minWidth="-Infinity" prefHeight="315.0" prefWidth="496.0" xmlns="http://javafx.com/javafx/8" xmlns:fx="http://javafx.com/fxml/1" fx:controller="com.yilnz.audiocutter.gui.GUIController">
   <children>
      <TextField fx:id="input1" layoutX="165.0" layoutY="63.0" />
      <TextField fx:id="input2" layoutX="165.0" layoutY="110.0" />
      <ChoiceBox fx:id="choice1" layoutX="107.0" layoutY="154.0" prefHeight="27.0" prefWidth="118.0" />
      <Label layoutX="100.0" layoutY="68.0" text="输入路径" />
      <Label layoutX="100.0" layoutY="115.0" text="输出路径" />
      <Button layoutX="190.0" layoutY="204.0" mnemonicParsing="false" onAction="#startProcess" prefHeight="27.0" prefWidth="118.0" text="开始处理" />
      <TextField fx:id="input3" layoutX="233.0" layoutY="154.0" prefHeight="27.0" prefWidth="76.0" />
      <Label layoutX="319.0" layoutY="159.0" text="秒" />
      <Button layoutX="346.0" layoutY="63.0" mnemonicParsing="false" onAction="#browseInput" text="浏览..." />
      <Button layoutX="346.0" layoutY="110.0" mnemonicParsing="false" onAction="#browseOutput" text="浏览..." />
   </children>
</Pane>
```