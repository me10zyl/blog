<div class="logo-wrapper">
{# if page.essays #}
  <!-- <a href="{{ url_for('/essays') }}" class="logo">{{ config.title }}</a> -->
{# else #}
  <a href="{{ url_for('.') }}" class="logo">{{ config.title }}</a>
{# endif #}
</div>

<nav class="site-navbar">
  {% if theme.menu %}
    <ul id="menu" class="menu">
      {% for name, path in theme.menu %}
        <li class="menu-item">
          <a class="menu-item-link" href="{{ url_for(path) }}">
            {% set itemName = __('menu.' + name.toLowerCase()) %}
            {% if itemName.startsWith('menu') %}
              {{ name }}
            {% else %}
              {{ itemName }}
            {% endif %}
          </a>
        </li>
      {% endfor %}
      {% if theme.theme.search %}
        <li class="menu-search">
          <form>
            <i class="iconfont icon-search" id="open-search"></i>
            <input type="text" class="search-input" id="search-input" />
            <i class="iconfont icon-close" id="close-search"></i>
          </form>
        </li>
      {% endif %}
    </ul>
  {% endif %}
</nav>

<nav style="clear:left">
	{{ breadcrum(page.permalink, page.path, page.published) }}
</nav>
