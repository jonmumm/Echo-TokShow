window.Echo = {} unless window.Echo
Echo.TokShow = {} unless Echo.TokShow

class Echo.TokShow
  constructor: (@config) ->
    # Check for required vars
    return unless @config && @config.target && @config.embed_id

    iframe = $("<iframe />",
      id: "videoTokshow"
      src: "http://api.opentok.com/hl/tokshow/#{@config.embed_id}/fan?size=small"
      style: "border:none"
      width: 520
      height: 380
      frameborder: "0"
      scrolling: "no"
    )

    $(@config.target).replaceWith iframe
    initSubmitClient = =>
      new Echo.Submit @config.submitOptions

    initStreamClient = =>
      new Echo.Stream @config.streamOptions

    if @config.submitOptions
      @config.submitOptions.appkey or= @config.appkey
      if not Echo.Submit
        $.ajax
          url: "http://cdn.echoenabled.com/clientapps/v2/submit.js"
          dataType: "script"
          cache: true
          success: initSubmitClient
      else
        initSubmitClient()

    if @config.streamOptions
      @config.streamOptions.appkey or= @config.appkey
      if not Echo.Stream
        $.ajax
          url: "http://cdn.echoenabled.com/clientapps/v2/stream.js"
          dataType: "script"
          cache: true
          success: initStreamClient
      else
        initStreamClient()
