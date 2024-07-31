import React from 'react';
import { Link } from 'react-router-dom';
const VoteDetail: React.FC = () => {
    
    const voteData = {
        "id": 1,
        "title": "제목입니다",
        "content": "투표 예시입니다 아무거나 입력할레요 \nhttp://example.com/vote1.jpg 이건 주소에여",
        "start_date": "2024-07-30T15:14:10",
        "end_date": "2024-08-06T15:14:10",
        "created_at": "2024-07-30T15:14:10",
        "questions": [
            {
                "question_id": 1,
                "question_text": "이거 할거야?",
                "options": [
                    {
                        "id": 1,
                        "option_text": "찬성"
                    },
                    {
                        "id": 2,
                        "option_text": "반대"
                    }
                ]
            }
        ]
    }
    
    const Contents = () =>  {
        return (
            // 백엔드로 POST 요청 보내는 로직 필요
            // 투표 가져오는 로직, submit 했을 시 투표 결과 보내는 로직 및 투표 틀 만들기 필요
        <form>
        {/* 제목 */}
            <div>
    
            <h2 className='text-base m-2 text-customTextColor'>제목</h2>
            <p className="w-full h-14   bg-customBackgroundColor text-base p-3 rounded-lg shadow-md border-solid border-2 outline-none transition-transform transform">
                {voteData.title}
            </p>
    
            </div>
        {/* 내용 */}
            <div>
            <h2 className='text-base m-2 text-customTextColor'>내용</h2>
            {/* 본문 */}
            <div
            className="w-full h-[350px] overflow-y-auto bg-customBackgroundColor resize-none text-base px-4 py-2 rounded-lg shadow-md border-solid border-2 outline-none transition-transform transform"
            >
            <p className=' whitespace-pre-wrap'>
                {voteData.content}
           </p>

            {
                voteData.questions.map((item)=>(

                 <div> {item.options[0].option_text}</div>
                )
                )
            }
            </div>
            </div>
        {/* 투표 기간 */}
            <div className='flex justify-end pt-2'>
                <span className='text-sm font-semibold mx-4'>
                    투표 기간 : {voteData.start_date} ~ {voteData.end_date}
                </span>
            </div>
    {/* 투표 버튼 */}
            <div className='pt-2 flex justify-center'>
            
            <button className=" w-32 h-10 mx-3 bg-customBlue text-white p-2 rounded-full">투표 정지</button>
            <button className=" w-32 h-10 mx-3 bg-customBlue text-white p-2 rounded-full">투표 알람 전송</button>
            <button className=" w-32 h-10 mx-3 bg-customBlue text-white p-2 rounded-full">투표 제출</button>

    
            </div>
        </form>
        )
    }

  return (
      <div className="p-8">
      <div className="">
        <div className="flex justify-start p-5">
            <Link to='/vote/finish' className='text-3xl	font-semibold'> ← </Link>
            <h3 className='text-3xl	font-semibold'>투표 상세</h3>
        </div>

        <div className="min-w-full min-h-[700px] p-6 bg-white border rounded-[20px] overflow-hidden">
            <Contents/>
        </div>
      </div>
    </div>
  );
};

export default VoteDetail;


