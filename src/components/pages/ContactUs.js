import notificationSound from "../assets/ding.mp3";
import noAnswerSound from "../assets/noanswer.mp3";

function ContactUs() {
  function play(sound) {
    new Audio(sound).play();
  }
  // Properties ----------------------------------
  // Hooks ---------------------------------------
  // Context -------------------------------------
  // Methods -------------------------------------
  // View ----------------------------------------
  return (
    <section>
      <h1>Contact Us</h1>
      <button onClick={() => play(notificationSound)}>
        Play Notification Sound
      </button>
      <button onClick={() => play(noAnswerSound)}>Play No Answer Sound</button>
    </section>
  );
}

export default ContactUs;
