# Echo VideoChat Plug-in

The Echo VideoChat Plug-in is a JavaScript plug-in for including the [OpenTok Group Chat
Embed](http://www.tokbox.com/opentok/plugnplay#GroupChat) embed on your
page. It uses the [Echo Stream
Form](http://wiki.aboutecho.com/w/page/30184446/Echo%20Application%20-%20Echo%20Submit%20Form) and [Submit Client](http://wiki.aboutecho.com/w/page/30181308/Echo%20Application%20-%20Echo%20Stream%20Client) to include a text chat widget. For more information, and a demo, visit the plug-in page [here](http://www.tokbox.com/opentok/plugnplay/echo/groupvideochat).

## Installation
1. Include Dependencies
Echo VideoChat depends on jQuery, the Echo Stream Client, and the Echo Submit Form. You can include all of these with the following:

```html
<script src="http://cdn.echoenabled.com/clientapps/v2/jquery-pack.js"></script>
```
  
2. Include JavaScript
Include videochat.js on your page.

3. Include CSS (optional)
If you would like the default style, include videochat.css. You can view the default style [here](http://www.tokbox.com/opentok/plugnplay/echo/groupvideochat). Do not include the CSS file if you would like the app unstyled.

## Example Setup
This specifies the required HTML elements and then creates a new instances of the Echo.VideoChat class.

```html
<div id="echo-embed">
  <div id="echo-videochat"></div>
  <div id="echo-submit"></div>
  <div id="echo-stream"></div>
</div>

<script type="text/javascript">
  var embed_id = "1embead460bea39c1bb410e7c2d21a82383bee99";
  new Echo.VideoChat({
    "target": document.getElementById("echo-videochat"),
    "appkey": "{{ YOUR ECHO API KEY }}",
    "embed_id": embed_id,
    "submitOptions": {
      "target": document.getElementById("echo-submit"),
      "targetURL": "{{ YOUR WEBPAGE URL }}"
    },
    "streamOptions": {
      "target": document.getElementById("echo-stream"),
      "query": "scope:{{ YOUR WEBPAGE URL }}"
    }
  });
</script>
```

## Configuration
You can pass in arguments in to `Echo.VideoChat` to customize the embed. These are the configuration options:

`target (HTMLElement)`
(required) The HTMLElement of where you would like the video chat embed to placed.

`appkey (string)` (required)
Your Echo application key.

`embed_id (string)` (required)
Your OpenTok Group Chat embed_id. You can set this statically or generate them dynamically. Read below to learn how to get an embed_id.

`submitOptions (Object)` (optional)
Options to include in the Echo Submit Form. For options visit [here](http://wiki.aboutecho.com/w/page/30184446/Echo%20Application%20-%20Echo%20Submit%20Form). If these options are not included, the plug-in will not display the Echo Submit Form.

`streamOptions (Object)` (optional)
Options to include in the Echo Stream Client. For options visit [here](http://wiki.aboutecho.com/w/page/30181308/Echo%20Application%20-%20Echo%20Stream%20Client). If these options are not included, the plug-in will not display the Echo Stream Client.

## Generating an embed_id
In testing you can use the following sample embed_id: 1embc48e6c811cd96a3ad03f82833bfb33db5394.

In production you will want to generate your own embed_ids dynamically for each group of people you would like in the same chat. You can do that using the OpenTok HTTP API.

To make calls to the OpenTok HTTP API, you need a production API key. To do that, get a staging key first [here](http://www.tokbox.com/opentok/api/tools/js/apikey), then use your staging key to get a production key [here](http://www.tokbox.com/opentok/api/tools/js/launch).

Once you have your key, make the following HTTP request:

```
Request
POST http://api.opentok.com/hl/embed/create
HEADER 'Content-type: application/x-www-form-urlencoded'
email: "{{ USER EMAIL ADDRESS }}"
callback: "callback"
```

You will receive a response that looks like this (in JSONP format)

```
callback({"embed_id": "2emb54185cf5b7eedd3d7ea96ffd4f2e0620b9c0"});
```

Parse the response to get the embed_id, store it and distribute it to users who you would like to be included in the same group chat.