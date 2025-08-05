let config = {
  address: "localhost",
  port: 8080,
  basePath: "/",
  ipWhitelist: ["127.0.0.1", "::ffff:127.0.0.1", "::1"],

  useHttps: false,
  httpsPrivateKey: "",
  httpsCertificate: "",

  language: "en",
  locale: "en-US",

  logLevel: ["INFO", "LOG", "WARN", "ERROR"],
  timeFormat: 24,
  units: "metric",

  modules: [
    { module: "alert" },
   
    {
      module: "clock",
      position: "top_left"
    },
    {
      module: "calendar",
      header: "Creado por @jaimegarzont",
      position: "top_left",
      config: {
        calendars: [
          {
            fetchInterval: 7 * 24 * 60 * 60 * 1000,
            symbol: "Labs",
            url: "https://calendar.google.com/calendar/ical/c_d6a9d8e693552611bd8ee6f2bdb8d49c677a26086a6528a8d2edc5a2120656f8%40group.calendar.google.com/public/basic.ics"
          }
        ]
      }
    },
    {
      module: "compliments",
      position: "lower_third"
    },
    {
      module: "weather",
      position: "bottom_right",
      config: {
        weatherProvider: "openmeteo",
        type: "current",
        lat: 40.416775,
        lon: -3.703790
      }
    },
    {
      module: "weather",
      position: "bottom_right",
      header: "Weather",
      config: {
        weatherProvider: "openmeteo",
        type: "forecast",
        lat: 40.416775,
        lon: -3.703790
      }
    },
    {
      module: "newsfeed",
      position: "bottom_bar",
      config: {
        feeds: [
          {
            title: "Noticias",
            url: "https://e00-elmundo.uecdn.es/rss/portada.xml"
          }
        ],
        showSourceTitle: true,
        showPublishDate: true,
        broadcastNewsFeeds: true,
        broadcastNewsUpdates: true
      }
    },
    {
      module: "MMM-GroveGestures",
      position: "top_left",
      config: {
        autoStart: true,
        verbose: false,
        recognitionTimeout: 1000,
        cancelGesture: "WAVE",
        visible: true,

        idleTimer: 1000 * 60 * 30,
        onIdle: {
          moduleExec: {
            module: [],
            exec: (module) => {
              module.hide(1000, null, { lockstring: "GESTURE" });
            },
          },
        },
        onDetected: {
          notificationExec: {
            notification: "GESTURE_DETECTED",
          },
        },

        gestureMapFromTo: {
          "Up": "UP",
          "Down": "DOWN",
          "Left": "LEFT",
          "Right": "RIGHT",
          "Forward": "FORWARD",
          "Backward": "BACKWARD",
          "Clockwise": "CLOCKWISE",
          "anti-clockwise": "ANTICLOCKWISE",
          "wave": "WAVE",
        },

        defaultNotification: "GESTURE",
        pythonPath: "/usr/bin/python",

        commandSet: {
          "default": {
            "LEFT": {
              notificationExec: {
                notification: "PREVIOUS_TRACK",
                payload: null,
              },
            },
            "RIGHT": {
              notificationExec: {
                notification: "NEXT_TRACK",
                payload: null,
              },
            },
            "CLOCKWISE": {
              notificationExec: {
                notification: "RANDOM_ON",
                payload: null,
              },
            },
            "ANTICLOCKWISE": {
              notificationExec: {
                notification: "RANDOM_OFF",
                payload: null,
              },
            },
            "UP": {
              notificationExec: {
                notification: "PLAY_MUSIC",
                payload: null,
              },
            },
            "DOWN": {
              notificationExec: {
                notification: "STOP_MUSIC",
                payload: null,
              },
            },
          },
        },
      },
    },
    {
      module: "MMM-ImagesPhotos",
      position: "top_right",
      config: {
        opacity: 0.95,
        animationSpeed: 500,
        updateInterval: 2000,
        maxWidth: "80%",
        maxHeight: "80%",
        sequential: false
      }
    },
    {
      module: "MMM-MP3Player",
      position: "top_left",
      config: {
        musicPath: "modules/MMM-MP3Player/music/",
        autoPlay: true,
        random: false,
        loopList: true
      },

      notificationReceived: function (notification, payload, sender) {
        switch (notification) {
          case "PLAY_MUSIC":
            this.sendSocketNotification("PLAY");
            break;
          case "PAUSE_MUSIC":
            this.sendSocketNotification("PAUSE");
            break;
          case "STOP_MUSIC":
            this.sendSocketNotification("STOP");
            break;
          case "NEXT_TRACK":
            this.sendSocketNotification("NEXT");
            break;
          case "PREVIOUS_TRACK":
            this.sendSocketNotification("PREVIOUS");
            break;
          case "RANDOM_ON":
            this.config.random = true;
            this.sendSocketNotification("RANDOM", this.config.random);
            break;
          case "RANDOM_OFF":
            this.config.random = false;
            this.sendSocketNotification("RANDOM", this.config.random);
            break;
        }
      }
    },
    {
      module: 'MMM-PublicTransit',
      position: 'bottom_right',
      header: 'Paraninfo',
      config: {
        global_stop_id: 'EMADES:22761',
        apiKey: 'cf0d5e8ae98bf2a831c58f027743710ed71de3f627fc27ee18981fe1b5d81721'
      }
    },
    {
      module: "MMM-DHT-Sensor",
      position: "top_left",
      config: {
        sensorPin: 26,
        sensorType: 22,
      }
    },
    {
      module: "MMM-Universal-Pir",
      position: "top_right",
      config: {
        gpioCommand: "gpiomon -r -b gpiochip0 24",
        onCommand: "xrandr --output HDMI-2 --auto",
        offCommand: "xrandr --output HDMI-2 --off",
        deactivateDelay: 10000,
      }
    },

    // ====== ADDED MMM-MQTT MODULE HERE ======
    {
      module: "MMM-MQTT",
      position: "bottom_left",
      header: "MQTT",
      config: {
        mqttServers: [
          {
            address: "localhost",
            port: "1883",
            subscriptions: [
              {
                topic: "college/classroom/attendance",
                label: "Attendance",
                suffix: " students",
                decimals: 0
              },
              {
                topic: "college/cafeteria/menu",
                label: "Menu del Día"
              },
              {
                topic: "college/student/month",
                label: "Estudiante del Mes"
              }
            ]
          }
        ]
      }
    }

  ],

  custom: {
    startup: function() {
      setTimeout(function() {
        MM.sendNotification("SHOW_CAMERA");
      }, 500);
    }
  }
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") { module.exports = config; }
