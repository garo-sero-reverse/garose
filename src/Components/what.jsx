import Sidebar from "./sidebar";
import "../Css/service.css";

const What = () => {
    return (
       <div className="use-container">
      <Sidebar />

      {/* 메인 콘텐츠 영역 */}
      <div className="content">

        {/* 제목 */}
        <h1 className="title">What is Prompt Injection ?</h1>

        {/* 카드 1 */}
        <div className="card">
          <p>내용을 입력해주세요</p>
        </div>

      </div>
    </div>
    );
}

export default What;