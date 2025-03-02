// dialog ref 기능이 리액트 19 이전 버전에서는 사용할 수 없어
// forwardRef를 사용하여 ref를 전달해야 한다.
// 아래는 예시로 사용하는 것을 보여준다. 
import { forwardRef, useImperativeHandle, useRef } from "react";

const ResultModal = forwardRef( function ResultModal({ remainingTime, targetTime, onReset}, ref) {

  // 앞에서 선언한 ref를 사용한다.
  const dialog = useRef();

  const userLost = remainingTime <= 0;
  const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
  const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

  // 앞에서 dialog.current.showModal(); 형식의 사용을 막기위해 
  // useImperativeHandle을 사용한다.
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      }
    };
  });

  return (
    <dialog 
      ref={dialog} 
      className="result-modal" 
      onClose={onReset} // 모달을 esc로 닫을 때, onReset 함수 실행
    >
      {userLost && <h2>You lost</h2>}
      {!userLost && <h2>Your Score: {score}</h2>}
      <p>
        The target time was <strong>{targetTime} seconds.</strong>
      </p>
      <p>
        You stopped the timer with <strong>{formattedRemainingTime} seconds left.</strong>
      </p>
      <form method="dialog" onSubmit={onReset}>
        <button>Close</button>
      </form>
    </dialog>
  );
});

export default ResultModal;