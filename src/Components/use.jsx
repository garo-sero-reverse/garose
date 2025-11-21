import Sidebar from "./sidebar";
import "../Css/service.css";

const Use = () => {
  return (
    <div className="use-container">
      <Sidebar />

      {/* 메인 콘텐츠 영역 */}
      <div className="content">

        {/* 제목 */}
        <h1 className="title">How to use ?</h1>

        {/* 카드 1 */}
        <div className="card">
          <div className="circle">1</div>
          <p>내용을 입력해주세요</p>
        </div>

        {/* 카드 2 */}
        <div className="card">
          <div className="circle">2</div>
          <p>내용을 입력해주세요.</p>
        </div>
      </div>
    </div>
  );
};

export default Use;
