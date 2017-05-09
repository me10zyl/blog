{% if page.comments and not is_home() %}
  <div class="comments" id="comments">
    {% if theme.disqus_shortname %}
      <div id="disqus_thread">
        <noscript>
          Please enable JavaScript to view the
          <a href="//disqus.com/?ref_noscript">comments powered by Disqus.</a>
        </noscript>
      </div>
    {% elif theme.duoshuo_shortname %}
      <div class="ds-thread" data-thread-key="{{ page.path }}"
           data-title="{{ page.title }}" data-url="{{ page.permalink }}">
      </div>
    {% elif theme.netease_key %}
       <!-- <div id="cloud-tie-wrapper" class="cloud-tie-wrapper"></div> -->
	<div id="cloud-tie-wrapper" class="cloud-tie-wrapper"></div>
<script src="https://img1.cache.netease.com/f2e/tie/yun/sdk/loader.js"></script>
<script>
var cloudTieConfig = {
  url: document.location.href, 
  sourceId: "",
  productKey: "fbd74a3b14b54e05aebb88de37369614",
  target: "cloud-tie-wrapper"
};
var yunManualLoad = true;
Tie.loader("aHR0cHM6Ly9hcGkuZ2VudGllLjE2My5jb20vcGMvbGl2ZXNjcmlwdC5odG1s", true);
</script>
    {% endif %}
  </div>
{% endif %}
