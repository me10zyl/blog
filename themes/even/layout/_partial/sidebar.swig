{% if (site.tags.length) %}
<aside id="sidebar">
<div class="widget-wrap">
<h3 class="widget-title">标签</h3>
  <div class="widget">
	{{ list_tags() }}
  </div>
</div>
</aside>
{% endif %}
