"use client";

import { messageCollection, auth } from "@/utils/firebase.browser";
import { signInAnonymously } from "@firebase/auth";
import { addDoc, getDocs } from "firebase/firestore";
import { Geist, Dancing_Script, Anonymous_Pro } from "next/font/google";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
});

const dancingScript = Dancing_Script({
  variable: "--font-dancing-script",
});

const anonymousePro = Anonymous_Pro({
  variable: "--font-anonymous-pro-mono",
  weight: "700",
});

export default function Home() {
  const [openInvitation, setOpenInvitation] = useState(false);
  const [sendPresent, setSendPresent] = useState(false);
  const [messages, setMessages] = useState([]);

  const nameRef = useRef(null);
  const messageRef = useRef(null);

  const queries = useSearchParams();
  const receipt = queries.get("receipt");
  const type = queries.get("type");

  async function copyToClipboard(content) {
    await navigator.clipboard.writeText(content);
  }

  async function postMessage(e) {
    e.preventDefault();

    const name = nameRef.current.value;
    const message = messageRef.current.value;

    const data = { name, message };

    await signInAnonymously(auth);
    await addDoc(messageCollection, data);
    setMessages((msgs) => [...msgs, data]);

    nameRef.current.value = "";
    messageRef.current.value = "";
  }

  async function getMessages() {
    const messageSnapshots = await getDocs(messageCollection);
    const messageData = messageSnapshots.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    setMessages(messageData);
  }

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <main style={{ maxWidth: "375px" }} className={`${geistSans.className}`}>
      <div id="hero">
        <section className="absolute top-0 left-0 right-0 h-full w-full">
          <img
            src={"/hero.png"}
            className="z-0 object-cover w-full h-full animate__animated animate__fadeIn"
          />
        </section>

        <section className="flex flex-col justify-between items-center h-svh z-20 relative py-7">
          <div className="mx-auto flex flex-col items-center">
            <img
              src="/logoname.png"
              className="animate__animated animate__fadeInDown"
            />
          </div>
          <div className="flex flex-col items-center mb-20 animate__animated animate__fadeInUp">
            <div className="text-center font-extrabold text-white">
              Kepada Yth.
              <br />
              Bapak/Ibu/Saudara(I)
            </div>
            <div className="text-center">
              {receipt && (
                <div className="font-bold text-white text-xl py-3">
                  {receipt}
                </div>
              )}
              <img src="/labelholder.png" width={200}></img>
            </div>
            <div className="mt-2 font-bold">
              <a
                href="#content"
                onClick={() => setOpenInvitation(true)}
                className="bg-[#8d6f40] relative rounded-full py-2 px-15 flex gap-2 items-end-safe text-white cursor-pointer"
              >
                Buka Undangan
              </a>
            </div>
          </div>
        </section>
      </div>

      {openInvitation && (
        <div id="content">
          <div className="bg-[#ffffff] h-full w-full">
            <img src="/border.png" />
            <section className="relative">
              <div className="absolute text-[#826b43] text-center ">
                <div className="italic px-16 leading-tight text-xs mt-40 animate__animated animate__fadeInUp">
                  “Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia
                  menciptakan pasangan-pasangan untukmu dari jenismu sendiri,
                  agar kamu cenderung dan merasa tenteram kepadanya, dan Dia
                  menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada
                  yang demikian itu benar-benar terdapat tanda-tanda (kebesaran
                  Allah) bagi kaum yang berpikir.”
                </div>
                <div className="font-bold text-xs mt-1  animate__animated animate__fadeInUp">
                  (Q.S. Ar-Rum: 21)
                </div>
                <div className="text-xs px-14 mt-4  animate__animated animate__fadeInUp">
                  Assalamu’alaikum Warohmatullahi Wabarokatuh
                </div>
                <div className="text-xs px-14 mt-4  animate__animated animate__fadeInUp">
                  Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud
                  melangsungkan resepsi pernikahan Putra dan Putri kami:
                </div>
              </div>
              <img src="/container.png" className="" />
            </section>
            <img src="/border.png" className="transform rotate-180 mt-5" />
          </div>

          <div className="bg-white pb-2 pt-4 px-4">
            <div className="border-2 border-[#8d6f40] p-4 rounded-xl text-center">
              <section className="mt-5">
                <img
                  src="/bride.png"
                  width={200}
                  className="mx-auto  animate__animated animate__fadeInDown"
                />
                <div
                  className={`text-[#8d6f40] ${dancingScript.className} mt-1 text-xl animate__animated animate__fadeInUp`}
                >
                  Zam Zakia Amma, S.Farm
                </div>
                <div className={`text-sm text-black ${geistSans.className}`}>
                  Putri Pertama Bapak Ambo Sakka & <br /> Ibu Kasmawir
                </div>
              </section>
              <section className="mt-8 mb-5">
                <img
                  src="/groom.png"
                  width={200}
                  className="mx-auto animate__animated animate__fadeInDown"
                />
                <div
                  className={`text-[#8d6f40] ${dancingScript.className} mt-1 text-xl  animate__animated animate__fadeInUp`}
                >
                  Arkjun Yudistira Pratama, S.Kom
                </div>
                <div className={`text-sm text-black ${geistSans.className}`}>
                  Putri Pertama Bapak Sandy Anwari & <br /> Ibu Herlina Hasra,
                  S.Pd., M.Pd
                </div>
              </section>
            </div>
          </div>

          <img src="/logo.png" width={40} className="mx-auto" />

          <div className="bg-white px-4 py-2">
            <div className="rounded-xl border-2 text-center py-6 text-[#8d6f40] relative">
              <img
                src="/border-half.png"
                width={120}
                className="absolute top-0 right-0"
              />
              <section className="">
                <img src="/icon-hand.png" width={80} className="mx-auto" />
                <div
                  className={`mt-2 text-xl ${dancingScript.className} antialiased`}
                >
                  Akad Nikah
                </div>
                <div className="text-black leading-tight text-sm">
                  Minggu, 27 Juli 2025
                  <br />
                  Jl. Poros Sinjai Bone
                  <br />
                  Tuie, Desa Pude, Kec. Kajuara
                  <br />
                  Kab.Bone
                </div>
              </section>
              <section className="my-6">
                <img src="/icon-reception.png" width={80} className="mx-auto" />
                <div
                  className={`mt-2 text-xl ${dancingScript.className} antialiased`}
                >
                  Resepsi
                </div>
                {type === "bride" && (
                  <div className="text-black leading-tight text-sm">
                    Sabtu, 9 Agustus 2025
                    <br />
                    Jl.Kepiting, Dusun Tuju-Tuju
                    <br />
                    Desa Tarasu, Kec. Kajuara
                    <br />
                    Kab.Bone
                  </div>
                )}
                {type === "groom" && (
                  <div className="text-black leading-tight text-sm">
                    Minggu, 10 Agustus 2025
                    <br />
                    Jl. Poros Sinjai - Palattae
                    <br />
                    Desa Bulutanah, Kec. Kajuara
                    <br />
                    Kab.Bone
                  </div>
                )}
              </section>
              <section className="">
                <img src="/icon-location.png" width={80} className="mx-auto" />
                <div
                  className={`mt-2 text-xl ${dancingScript.className} antialiased`}
                >
                  Resepsi
                </div>
                <div className="mt-3">
                  <a
                    href={
                      type === "bride"
                        ? "https://maps.app.goo.gl/WQDrBDQXs3WiTieq9"
                        : "https://maps.app.goo.gl/8w6hQMbVSiLvGpR68"
                    }
                    target="_blank"
                    role="button"
                    className="border-[#8d6f40] cursor-pointer border text-[#8d6f40] py-1 px-8 bg-white relative rounded-full font-medium"
                  >
                    Google Maps
                  </a>
                </div>
              </section>

              <img
                src="/border-half.png"
                width={120}
                className="absolute bottom-0 left-0 transform rotate-180"
              />
            </div>
          </div>

          <img src="/logo.png" width={40} className="mx-auto " />

          <div className="bg-white px-4 py-2">
            <div className="rounded-xl border-2 text-center py-6 text-[#8d6f40] relative">
              <img
                src="/border-half.png"
                width={120}
                className="absolute top-0 right-0"
              />
              <section className="mt-4">
                <img src="/icon-present.png" width={80} className="mx-auto" />
                <div
                  className={`mt-3 text-xl ${dancingScript.className} antialiased`}
                >
                  Hadiah Untuk Mempelai
                </div>
                <div className="text-black leading-tight text-sm mx-6 mt-2">
                  Doa restu Anda merupakan karunia yang sangat berarti bagi
                  kedua mempelai. Jika berkenan, tak ada batasan ketulusan dan
                  mempelai menerima pemberian hadiah dalam bentuk cashless.
                </div>
              </section>

              {!sendPresent && (
                <button
                  onClick={() => setSendPresent(true)}
                  type="button"
                  className="border-[#8d6f40] cursor-pointer border text-[#8d6f40] py-1 px-16 bg-white relative rounded-full my-8 font-medium"
                >
                  Kirim Hadiah
                </button>
              )}

              {sendPresent && type === "groom" && (
                <section className="text-center my-8">
                  <img src="/BRI.png" width={120} className="mx-auto" />
                  <div className="mt-3 text-2xl flex items-center gap-2 justify-center">
                    <span>0258 0103 8575 507</span>
                    <button
                      type="button"
                      onClick={async () => {
                        await copyToClipboard("025801038575507");
                      }}
                      className="bg-[#8d6f40] rounded p-1 cursor-pointer"
                    >
                      <svg
                        width="24px"
                        height="24px"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        stroke="#8d6f40"
                      >
                        <path
                          d="M20.9983 10C20.9862 7.82497 20.8897 6.64706 20.1213 5.87868C19.2426 5 17.8284 5 15 5H12C9.17157 5 7.75736 5 6.87868 5.87868C6 6.75736 6 8.17157 6 11V16C6 18.8284 6 20.2426 6.87868 21.1213C7.75736 22 9.17157 22 12 22H15C17.8284 22 19.2426 22 20.1213 21.1213C21 20.2426 21 18.8284 21 16V15"
                          stroke="#FFFFFF"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        />
                        <path
                          d="M3 10V16C3 17.6569 4.34315 19 6 19M18 5C18 3.34315 16.6569 2 15 2H11C7.22876 2 5.34315 2 4.17157 3.17157C3.51839 3.82475 3.22937 4.69989 3.10149 6"
                          stroke="#FFFFFF"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        />
                      </svg>
                    </button>
                  </div>
                  <span className="text-sm ">A.N Arkjun Yudistira Pratama</span>
                </section>
              )}
              {sendPresent && type === "bride" && (
                <section className="text-center my-8">
                  <img src="/BRI.png" width={120} className="mx-auto" />
                  <div className="mt-3 text-2xl flex items-center gap-2 justify-center">
                    <span>1665 0100 8852 507</span>
                    <button
                      type="button"
                      onClick={async () => {
                        await copyToClipboard("166501008852507");
                      }}
                      className="bg-[#8d6f40] rounded p-1 cursor-pointer"
                    >
                      <svg
                        width="24px"
                        height="24px"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        stroke="#8d6f40"
                      >
                        <path
                          d="M20.9983 10C20.9862 7.82497 20.8897 6.64706 20.1213 5.87868C19.2426 5 17.8284 5 15 5H12C9.17157 5 7.75736 5 6.87868 5.87868C6 6.75736 6 8.17157 6 11V16C6 18.8284 6 20.2426 6.87868 21.1213C7.75736 22 9.17157 22 12 22H15C17.8284 22 19.2426 22 20.1213 21.1213C21 20.2426 21 18.8284 21 16V15"
                          stroke="#FFFFFF"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        />
                        <path
                          d="M3 10V16C3 17.6569 4.34315 19 6 19M18 5C18 3.34315 16.6569 2 15 2H11C7.22876 2 5.34315 2 4.17157 3.17157C3.51839 3.82475 3.22937 4.69989 3.10149 6"
                          stroke="#FFFFFF"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        />
                      </svg>
                    </button>
                  </div>
                  <span className="text-sm ">A.N Zam Zakia Amma</span>
                </section>
              )}

              <section>
                <div className="text-black leading-tight text-sm mx-8">
                  Merupakan suatu kehormatan dan kebahagiaan bagi kami, apabila
                  Bapak/Ibu/Saudara(i) berkenaan hadir dan memberi doa restu.
                  <br />
                  Terima kasih.
                </div>
                <div className="text-black leading-tight text-sm mx-8 my-3">
                  Wassalamu’alaikum Warohmatullahi Wabarokatuh
                </div>
                <div className="text-black leading-tight text-sm mx-8">
                  Kami yang berbahagia,
                </div>
              </section>

              <img src="/name.png" width={150} className="mx-auto my-5" />

              <img
                src="/border-half.png"
                width={120}
                className="absolute bottom-0 left-0 transform rotate-180"
              />
            </div>
          </div>

          <img src="/logo.png" width={40} className="mx-auto" />

          <div className="px-4 mt-2 w-full h-full relative overflow-hidden">
            <section className="z-20 relative pt-4">
              <div
                className={`text-center text-xl tracking-widest ${anonymousePro.className}`}
              >
                OUR <br /> MOMENTS
              </div>
              <img src="our-moments.png" className="mt-3" />
              <img src="name-two.png" className="-mt-16" />
            </section>
            <img
              src="/flower.png"
              className="z-10 absolute -right-20 -bottom-10"
              width={250}
            />
            <section className="absolute top-0 left-0 right-0 h-full w-full">
              <img src={"/bg.png"} className="z-0 object-cover w-full h-full" />
            </section>
          </div>

          <div className="w-full h-full relative overflow-hidden">
            <img src="/galleries.png" className="relative z-10 pb-2" />
            <section className="absolute top-0 left-0 right-0 h-full w-full">
              <img src={"/bg.png"} className="z-0 object-cover w-full h-full" />
            </section>
          </div>

          <div className="bg-[#ffffff] h-full w-full">
            <img src="/border.png" />
            <section className="relative">
              <div
                className={`text-center text-xl tracking-widest ${anonymousePro.className}`}
              >
                SALAM-SALAM YUK
              </div>
              <form
                onSubmit={postMessage}
                className="my-5 flex flex-col items-center gap-4"
              >
                <input
                  type="text"
                  ref={nameRef}
                  placeholder="Isi nama dulu yaa"
                  className="border-b border-[#8d6f40] w-3/4 focus:ring-0 focus:outline-0"
                  required
                />
                <textarea
                  placeholder="Ketik ucapan disini yaa"
                  ref={messageRef}
                  rows={5}
                  className="border border-[#8d6f40] w-3/4  focus:ring-0 focus:outline-0 rounded"
                  required
                ></textarea>
                <button className="border-[#8d6f40] border text-[#8d6f40] py-1 w-3/4 bg-white relative rounded-full font-medium">
                  Kirim Ucapan
                </button>
              </form>
              <div className="overflow-y-auto max-h-80 text-[#8d6f40] w-3/4 mx-auto divide-y">
                {messages.length > 0 &&
                  messages.map((msg, idx) => (
                    <div className="py-3" key={idx}>
                      <h6 className="font-bold text-sm mb-1">{msg.name}</h6>
                      <p className="text-xs">{msg.message}</p>
                    </div>
                  ))}
              </div>
            </section>
            <img src="/border.png" className="transform rotate-180 mt-5" />
          </div>

          <div>
            <section className="relative top-0 left-0 right-0 h-full w-full">
              <img
                src={"/footer.jpg"}
                className="z-0 object-cover w-full h-full"
              />
            </section>
          </div>
        </div>
      )}
    </main>
  );
}
