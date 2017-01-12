## Specifications

- see [CodePen](http://s.codepen.io/gracen/debug/bgVZoR/NjrYzybYKYLA) for completed version in DEBUG mode (refer "Known Issues" section below)


### Objective:
Build a CodePen.io app that is functionally similar to [this](https://codepen.io/FreeCodeCamp/full/Myvqmo/).

**User Stories:**  

1. I can see whether Free Code Camp is currently streaming on Twitch.tv.
2. I can click the status output and be sent directly to the Free Code Camp's Twitch.tv channel.
3. if a Twitch user is currently streaming, I can see additional details about what they are streaming.
4. I will see a placeholder notification if a streamer has closed their Twitch account (or the account never existed). You can verify this works by adding brunofin and comster404 to your array of Twitch streamers.


**Hints:**

1. See an example call to Twitch.tv's JSONP API [here](http://forum.freecodecamp.com/t/use-the-twitchtv-json-api/19541).
2. The relevant documentation about this API call is [here](https://github.com/justintv/Twitch-API/blob/master/v3_resources/streams.md#get-streamschannel).
3. Here's an array of the Twitch.tv usernames of people who regularly stream: ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"]
4. UPDATE: Due to a change in conditions on API usage explained [here](https://blog.twitch.tv/client-id-required-for-kraken-api-calls-afbb8e95f843#.s5ym7xo5v) Twitch.tv now requires an API key, but we've built a workaround. Use https://wind-bow.gomix.me/twitch-api instead of twitch's API base URL (i.e. https://api.twitch.tv/kraken ) and you'll still be able to get account information, without needing to sign up for an API key.


see [instructions](https://www.freecodecamp.com/challenges/use-the-twitchtv-json-api)


## Plan
1. background
    - [X] solid color background
2. edges
    - header part
        - [X] text, TWITCH STREAMERS
        - interactive sliding All / Online / Offline
            - [X] default slide out All, slide in Online & Offline
            - [-] slide out upon hover (future enhancement, no more hover effect after 1st click)
            - [X] click on option toggles slide status
            - [X] filters result set per selected option
        - search input field
            - [X] search icon toggle
            - [X] tooltip to click to search
            - [-] autocomplete (future enhancement, click on search/cancel reloading page)
    - bottom part
        - [X] consistent color scheme as header
3. get data
    - [X] requiring client id
    - [X] postman? figure out hierarchy, identify required key-val
4. main list
    - [X] logo link to streamer page
    - [X] name link to streamer page
    - online
        - [-] streaming content name with link to stream (not implementing)
        - [X] color scheme to indicate online
    - offline
        - [X] color scheme to indicate offline
        - [X] text indicating offline in place of stream name
    - closed twitch account
        - [X] color scheme indicating closed account
        - [X] placeholder notification

## Future Enhancements

- hover effect on filter buttons
- filter from autocomplete list

## Known Issues

- tracked in Issue# 1340 "Issues with linking to Twitch from CodePen IFrame"
- [append "1340" to this link](https://github.com/FreeCodeCamp/freecodecamp/issues/)
- working as expected in DEBUG mode


## Note

- colors from [Paletton](http://paletton.com/#uid=11T0u0kkVsbp4QUnjBfhUlFbjbz)
- submitting project as all given requirements satisfied
- noting down tasks for future enhancements in "Future Enhancements" section above
