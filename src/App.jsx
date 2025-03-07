import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import "dayjs/locale/ru";
import utc from "dayjs/plugin/utc";

import timezone from "dayjs/plugin/timezone";
import Select from "react-select";
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(duration);
const TIMES = [
  { "01.03.2025": ["5:40", "18:17"] },
  { "02.03.2025": ["5:38", "18:18"] },
  { "03.03.2025": ["5:37", "18:19"] },
  { "04.03.2025": ["5:35", "18:21"] },
  { "05.03.2025": ["5:33", "18:21"] },
  { "06.03.2025": ["5:32", "18:02"] },
  { "07.03.2025": ["5:30", "18:24"] },
  { "08.03.2025": ["5:29", "18:25"] },
  { "09.03.2025": ["5:27", "18:26"] },
  { "10.03.2025": ["5:25", "18:27"] },
  { "11.03.2025": ["5:24", "18:28"] },
  { "12.03.2025": ["5:22", "18:29"] },
  { "13.03.2025": ["5:20", "18:30"] },
  { "14.03.2025": ["5:18", "18:32"] },
  { "15.03.2025": ["5:17", "18:33"] },
  { "16.03.2025": ["5:15", "18:34"] },
  { "17.03.2025": ["5:13", "18:34"] },
  { "18.03.2025": ["5:12", "18:36"] },
  { "19.03.2025": ["5:10", "18:37"] },
  { "20.03.2025": ["5:08", "18:38"] },
  { "21.03.2025": ["5:06", "18:39"] },
  { "22.03.2025": ["5:05", "18:40"] },
  { "23.03.2025": ["5:03", "18:41"] },
  { "24.03.2025": ["5:01", "18:42"] },
  { "25.03.2025": ["4:59", "18:44"] },
  { "26.03.2025": ["4:57", "18:45"] },
  { "27.03.2025": ["4:55", "18:46"] },
  { "28.03.2025": ["4:54", "18:47"] },
  { "29.03.2025": ["4:52", "18:48"] },
  { "30.03.2025": ["4:50", "18:49"] },
];
const differRegionTime = {
  Angren: -4,
  Toshkent: 0,
  Parkent: -2,
  Andijon: -13,
  Xonobod: -15,
  Shaxrixon: -12,
  Xojaobod: -14,
  Namangan: -10,
  Pop: -7,
  Chortoq: -11,
  Kosonsoy: -9,
  "Farg'ona": -7,
  Rishton: -9,
  "Qo'qon": -7,
  "Marg'ilon": -11,

  Bekobod: 2,
  Buxoro: 24,
  Gazli: 25,
  "G'ijduvon": 19,
  "Qorako'l": 27,
  Guliston: 3,
  Sardoba: 3,
  Jizzax: 8,
  Zomin: 6,
  Forish: 9,
  "G'allaorol": 10,
  Navoiy: 20,
  Zarafshon: 20,
  Konimex: 19,
  Nurota: 15,
  Uchquduq: 10,
  Nukus: 38,
  "Mo'ynoq": 37,
  "Taxtako'pir": 31,
  "Qo'ng'irot": 40,
  Samarqand: 15,
  Ishtixon: 13,
  Mirbozor: 16,
  "Kattaqo'rg'on": 14,
  Urgut: 11,
  Termiz: 14,
  Boysun: 13,
  "Sho'rchi": 11,
  Qarshi: 18,
  Dehqonobod: 15,
  Koson: 17,
  Muborak: 19,
  Shahrisabz: 14,
  "G'uzor": 17,
};

const options = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

const customStyles = {
  control: (base, state) => ({
    ...base,
    border: "1px solid #242424",
    borderRadius: "6px",
    boxShadow: state.isFocused ? "0 0 3px rgba(0, 123, 255, 0.5)" : "none",
    "&:hover": { borderColor: "#242424" },
    minHeight: "36px",
    fontSize: "14px",
    width: "300px",
    color: "#fff",

    backgroundColor: "#1a1a1a",
  }),
  singleValue: (base) => ({
    ...base,
    color: "#fff",
    fontSize: "14px",
  }),
  placeholder: (base) => ({
    ...base,
    color: "#fff",
    fontSize: "14px",
  }),
  menu: (base) => ({
    ...base,
    borderRadius: "6px",
    backgroundColor: "#242424",
    border: "1px solid #242424",
    color: "#fff",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
  }),
  option: (base, state) => ({
    ...base,
    padding: "8px 12px",
    fontSize: "14px",
    backgroundColor: state.isSelected
      ? "#1a1a1a"
      : state.isFocused
      ? "black" // <-- Set hover color to white
      : "white",
    color: state.isSelected
      ? "#fff"
      : state.isFocused
      ? "#fff" // <-- Set hover color to white
      : "#000",
    cursor: "pointer",
  }),
};
const CountdownPiP = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const [count, setCount] = useState(0);
  const [isIftar, setisIftar] = useState(true);
  const [region, setRegion] = useState("Toshkent");
  const [isRamazan, setisRamazan] = useState(true);
  const [activePIP, setActivePIP] = useState(false);
  const [loading, setLoading] = useState(false);
  let nextRamadon = dayjs().diff(dayjs("2026.02.17"), "day");

  const claculateIftarTime = () => {
    const today = dayjs(new Date()).add(5, "hour").format("DD.MM.YYYY");

    const now = dayjs(new Date());
    const tomorrow = dayjs().add(1, "day").format("DD.MM.YYYY");

    const todaysIftorTime = TIMES.find((t) => t[today]);
    if (!todaysIftorTime) {
      setisRamazan(false);
      return;
    }

    const tomorrowsIftorTime = TIMES.find((t) => t[tomorrow]);

    const todays_iftor_hour_and_minut = todaysIftorTime[today][1].split(":");

    const tomorrows_iftor_hour_and_minut =
      tomorrowsIftorTime[tomorrow][1].split(":");
    const tomorrows_sahar_hour_and_minut =
      tomorrowsIftorTime[tomorrow][0].split(":");

    const todays_iftor_targetTime = dayjs()
      .startOf("day")
      .add(todays_iftor_hour_and_minut[0], "hour")
      .add(todays_iftor_hour_and_minut[1], "minute")
      .add(differRegionTime[region], "minute");

    let difftodays_inftor_seconds = now.diff(todays_iftor_targetTime, "second");

    const tomorrows_sahar_targetTime = now
      .startOf("day")
      .add(tomorrows_sahar_hour_and_minut[0], "hour")
      .add(tomorrows_sahar_hour_and_minut[1], "minute")
      .add(differRegionTime[region] * -1, "minute");

    const todays_iftor_targetTimeTomorrowiftor = now
      .startOf("day")
      .add(tomorrows_iftor_hour_and_minut[0], "hour")
      .add(tomorrows_iftor_hour_and_minut[1], "minute")
      .add(differRegionTime[region], "minute");

    let diff_tomorrows_sahar_seconds = now.diff(
      tomorrows_sahar_targetTime,
      "second"
    );
    let diff_tomorrows_iftor_seconds = now.diff(
      todays_iftor_targetTimeTomorrowiftor,
      "second"
    );

    const abs_todays_inftor_duration = dayjs.duration(
      Math.abs(difftodays_inftor_seconds),
      "seconds"
    );
    const abs_todays_sahar_duration = dayjs.duration(
      Math.abs(diff_tomorrows_sahar_seconds),
      "seconds"
    );
    const abs_todays_iftor_duration = dayjs.duration(
      Math.abs(diff_tomorrows_iftor_seconds),
      "seconds"
    );
    if (difftodays_inftor_seconds < 0) {
      setisIftar(true);
      const result = `${String(abs_todays_inftor_duration.hours()).padStart(
        2,
        "0"
      )}:${String(abs_todays_inftor_duration.minutes()).padStart(
        2,
        "0"
      )}:${String(abs_todays_inftor_duration.seconds()).padStart(2, "0")}`;

      setCount(result);
    } else {
      if (diff_tomorrows_sahar_seconds < 0) {
        setisIftar(false);
        const result = `${String(abs_todays_sahar_duration.hours()).padStart(
          2,
          "0"
        )}:${String(abs_todays_sahar_duration.minutes()).padStart(
          2,
          "0"
        )}:${String(abs_todays_sahar_duration.seconds()).padStart(2, "0")}`;

        setCount(result);
      } else {
        setisIftar(true);
        const result = `${String(abs_todays_iftor_duration.hours()).padStart(
          2,
          "0"
        )}:${String(abs_todays_iftor_duration.minutes()).padStart(
          2,
          "0"
        )}:${String(abs_todays_iftor_duration.seconds()).padStart(2, "0")}`;

        setCount(result);
      }
    }
  };

  // Load the Orbitron font from Google Fonts (or ensure it’s available)
  useEffect(() => {
    const loadFont = async () => {
      const font = new FontFace(
        "Orbitron",
        "url(https://fonts.googleapis.com/css2?family=Orbitron&display=swap)"
      );
      await font.load();
      document.fonts.add(font);
    };
    loadFont().catch((err) => console.error("Font loading failed:", err));
  }, []);

  // Setup canvas and countdown
  useEffect(() => {
    if (!canvasRef.current || !videoRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 640;
    canvas.height = 360;

    // Create a MediaStream from the canvas
    streamRef.current = canvas.captureStream(30); // 30 FPS
    videoRef.current.srcObject = streamRef.current;

    // Drawing loop
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw background
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Countdown Text
      ctx.fillStyle = "white";
      ctx.font = "50px 'Orbitron', sans-serif"; // Use Orbitron with fallback
      ctx.textAlign = "center";
      ctx.fillText(`${count}`, canvas.width / 2, canvas.height / 2);

      requestAnimationFrame(draw); // Continuous redraw
    };

    draw();
    // Countdown interval
    // const interval = setInterval(() => {
    //   setCountdown((prev) => {
    //     if (prev <= 1) {
    //       clearInterval(interval);
    //       return 0;
    //     }
    //     return prev - 1;
    //   });
    // }, 1000);
    // return () => clearInterval(interval); // Cleanup
  }, [count]); // Depend on countdown to update text

  const handleStartPiP = async () => {
    if (videoRef.current) {
      try {
        setActivePIP(true);
        await videoRef.current.requestPictureInPicture();
      } catch (error) {
        console.error("Error enabling PiP:", error);
      }
    }
  };

  useEffect(() => {
    const interval = setTimeout(() => {
      claculateIftarTime();
      if (!document.pictureInPictureElement) {
        setActivePIP(false);
      }
      setLoading(false);
    }, 1000);
    return () => clearTimeout(interval);
  });

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {isRamazan && (
        <div
          style={{
            width: "100vw",
            overflow: "hidden",
            whiteSpace: "nowrap",
            position: "relative",
            background: "#000",
            color: "#fff",
            height: "30px",
            marginTop: "5px",
            paddingTop: "5px",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              display: "inline-block",
              whiteSpace: "nowrap",
              position: "absolute",
              animation: "scroll 20s linear infinite",
            }}
          >
            Birodar! Ko'rsatilgan vaqtdan 3-4 daqiqa ehtiyotini oling! Ushbu
            vaqt va boshqa taqvimlardagi vaqt bu hisob-kitob, ya'ni xatolik
            bo'lishi mumkun.
          </div>

          <style>
            {`
          @keyframes scroll {
            from {
              transform: translateX(100%);
            }
            to {
              transform: translateX(-100%);
            }
          }
        `}
          </style>
        </div>
      )}
      {loading ? (
        <div
          style={{
            height: "100vh",
            width: "100vw",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            backgroundColor: "#0009",
            zIndex: "999",
            top: 0,
            fontSize: "20px",
            fontWeight: "800",
            right: 0,
          }}
        >
          Yuklanmoqda....
        </div>
      ) : (
        <></>
      )}
      {isRamazan && (
        <div
          style={{
            width: "90vw",
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
            zIndex: 9999,
          }}
        >
          <Select
            options={Object.keys(differRegionTime).map((a) => ({
              label: a,
              value: a,
            }))}
            value={{ value: region, label: region }}
            // defaultValue={{ value: "Toshkent", label: "Toshkent" }}
            onChange={(e) => {
              setRegion(e?.value);
              setLoading(true);
            }}
            styles={customStyles}
          />
        </div>
      )}
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Orbitron&display=swap');`}
      </style>
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        style={{
          width: "0px",
          backgroundColor: "#242424",
          display: activePIP ? "block" : "none",
          height: "0px",
        }}
      ></video>
      {isRamazan ? (
        <div
          style={{
            position: "absolute",
            bottom: "0",
            top: 0,
            display: "flex",
            alignItems: "center",
            // flexDirection: "column",
            flexWrap: "wrap",
            justifyContent: "center",
            width: "100vw",
          }}
        >
          <p
            style={{
              fontSize: "20px",
              margin: "30px 10px 0 0",
            }}
          >
            <span
              style={{
                fontSize: "20px",
                backgroundColor: "#fff",
                color: "#000",
                borderRadius: "10px",
                padding: "5px 10px",
                marginRight: "10px",
              }}
            >
              {isIftar ? "IFTOR" : "SAHARLIK"}
            </span>
            gacha
          </p>
          <p
            style={{
              fontFamily: "Orbitron",
              fontSize: "70px",
              margin: "0 20px",
            }}
          >
            {count}
          </p>
          <p
            style={{
              fontSize: "20px",
              margin: "30px 50px 0 0",
            }}
          ></p>
          {!activePIP ? (
            <button onClick={handleStartPiP}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="currentColor"
              >
                <path d="M19 7H5c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm0 10H5V9h14v8zm-3-3h4v3h-4v-3z" />
              </svg>
            </button>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <div
          style={{
            fontSize: "20px",
            marginTop: "35vh",
          }}
        >
          Ramazonga
          <p
            style={{
              fontFamily: "Orbitron",
              fontSize: "70px",
              margin: "0 20px",
            }}
          >
            {nextRamadon * -1}kun qoldi
          </p>
        </div>
      )}
    </div>
  );
};

export default CountdownPiP;
