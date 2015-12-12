# How to get and run ngrok as an HTTP relay
You can choose to use ngrok as we explain here, but you can always choose to run your service as well, in the cloud perhaps, as long as it is hosted with a public IP and DNS name that GitHub can reach.  

WebHook are simple HTTP/S POST calls, using an optional "secret" to any HTTP listener that you define. GitHub is just a messenger. What the receiver does with that message is entirely up to the receiver.
## download ngrok
Navigate to [https://ngrok.com/download](https://ngrok.com/download) and download the version for your platform.

## Run Ngrok
Once you have the ngrok download, it's either zipped or tar'd (usually zip). Unzip it using the archive manager of your choice to a directory of your choice.

### Command line
ngrok is a simple relay server that will setup a dynamic URL and hostname specfically for your "tunnel/relay". Each time you run it the DNS name will be different.

Since by default, Express server uses port 3000, that's how we'll run ngrok.


`
ngrok http 3000
`

