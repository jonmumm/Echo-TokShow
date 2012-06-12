(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  if (!window.Echo) {
    window.Echo = {};
  }
  if (!Echo.TokShow) {
    Echo.TokShow = {};
  }
  Echo.TokShow = (function() {
    function TokShow(config) {
      var iframe, initStreamClient, initSubmitClient, _base, _base2;
      this.config = config;
      if (!(this.config && this.config.target && this.config.embed_id)) {
        return;
      }
      iframe = $("<iframe />", {
        id: "videoTokshow",
        src: "http://api.opentok.com/hl/tokshow/" + this.config.embed_id + "/fan?size=small",
        style: "border:none",
        width: 520,
        height: 380,
        frameborder: "0",
        scrolling: "no"
      });
      $(this.config.target).replaceWith(iframe);
      initSubmitClient = __bind(function() {
        return new Echo.Submit(this.config.submitOptions);
      }, this);
      initStreamClient = __bind(function() {
        return new Echo.Stream(this.config.streamOptions);
      }, this);
      if (this.config.submitOptions) {
        (_base = this.config.submitOptions).appkey || (_base.appkey = this.config.appkey);
        if (!Echo.Submit) {
          $.ajax({
            url: "http://cdn.echoenabled.com/clientapps/v2/submit.js",
            dataType: "script",
            cache: true,
            success: initSubmitClient
          });
        } else {
          initSubmitClient();
        }
      }
      if (this.config.streamOptions) {
        (_base2 = this.config.streamOptions).appkey || (_base2.appkey = this.config.appkey);
        if (!Echo.Stream) {
          $.ajax({
            url: "http://cdn.echoenabled.com/clientapps/v2/stream.js",
            dataType: "script",
            cache: true,
            success: initStreamClient
          });
        } else {
          initStreamClient();
        }
      }
    }
    return TokShow;
  })();
}).call(this);
