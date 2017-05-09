{% extends "_layout.swig" %}

{% block title %} {{ page.title }} · {{ config.title }} {% endblock %}

{% block content %}

{% if page.type === 'tags' %}
    {% include '_partial/tags.swig' %}
{% elif page.type === 'essays' %}
    {% include '_partial/essays.swig' %}
{% else %}
  <article class="post">
    <div class="post-content">
      {{ page.content }}
    </div>
  </article>
{% endif %}

{% endblock %}
