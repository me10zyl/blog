{% if theme.netease_key %}
<!--  <script>
    var cloudTieConfig = {
      url: document.location.href, 
      sourceId: "",
      productKey: "{{theme.netease_key}}",
      target: "cloud-tie-wrapper"
    };
  </script>
  <script src="https://img1.cache.netease.com/f2e/tie/yun/sdk/loader.js"></script> -->
<script src="https://img1.cache.netease.com/f2e/tie/yun/sdk/loader.js"></script>
<script>
var cloudTieConfig = {
  url: document.location.href, 
  sourceId: "",
  productKey: "{{ theme.netease_key }}",
  target: "cloud-tie-wrapper"
};
var yunManualLoad = true;
Tie.loader("aHR0cHM6Ly9hcGkuZ2VudGllLjE2My5jb20vcGMvbGl2ZXNjcmlwdC5odG1s", true);
</script>
{% endif %}
