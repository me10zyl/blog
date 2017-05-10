{% import '../_macro/post.swig' as post_template %}

essays.swig
<section id="posts" class="posts">
  {% for post in page.posts %}
  {{ post_template.render(post) }}
  {% endfor %}
</section>
