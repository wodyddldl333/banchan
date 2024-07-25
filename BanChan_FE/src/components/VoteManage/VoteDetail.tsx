import React from 'react';
import { Link } from 'react-router-dom';
const VoteDetail: React.FC = () => {


    const Contents = () =>  {
        return (
            // 백엔드로 POST 요청 보내는 로직 필요
            // 투표 가져오는 로직, submit 했을 시 투표 결과 보내는 로직 및 투표 틀 만들기 필요
        <form>
        {/* 제목 */}
            <div>

            <h2 className='text-base m-2 text-customTextColor'>제목</h2>
            <p className="w-full h-14   bg-customBackgroundColor text-base p-3 rounded-lg shadow-md border-solid border-2 outline-none transition-transform transform">
                LH 7월 4주차 회의 안건 관련 투표
                
            </p>

            </div>
        {/* 내용 */}
            <div>
            <h2 className='text-base m-2 text-customTextColor'>내용</h2>
            {/* 본문 */}
            <div
            className="w-full h-[350px] overflow-y-auto bg-customBackgroundColor resize-none text-base px-4 py-2 rounded-lg shadow-md border-solid border-2 outline-none transition-transform transform"
            >
            <p className=''>
                이번 7월 4주차 회의안건은 총 2가지 입니다.<br />
                1. 엘레베이터 점검 일자 관련<br />
                2. 각 세대별 출입 카드 제작 관련<br />
                자세한 사항은 아래 공지사항에서 확인 부탁드립니다.<br />
                <a href="https://www.banchan.com/notice/123456789" className="text-blue-500">https://www.banchan.com/notice/123456789</a>
                자세한 사항은 아래 공지사항에서 확인 부탁드립니다.<br />
                자세한 사항은 아래 공지사항에서 확인 부탁드립니다.<br />
                자세한 사항은 아래 공지사항에서 확인 부탁드립니다.<br />
                자세한 사항은 아래 공지사항에서 확인 부탁드립니다.<br />
                자세한 사항은 아래 공지사항에서 확인 부탁드립니다.<br />
                자세한 사항은 아래 공지사항에서 확인 부탁드립니다.<br />
                자세한 사항은 아래 공지사항에서 확인 부탁드립니다.<br />
                자세한 사항은 아래 공지사항에서 확인 부탁드립니다.<br />                자세한 사항은 아래 공지사항에서 확인 부탁드립니다.<br />
                자세한 사항은 아래 공지사항에서 확인 부탁드립니다.<br />
                자세한 사항은 아래 공지사항에서 확인 부탁드립니다.<br />

           </p>
            </div>
            </div>
        {/* 투표 기간 */}
            <div className='flex justify-end pt-2'>
                <span className='text-sm font-semibold mx-4'>
                    투표 기간 : 2024.07.24 ~ 2024.07.27
                </span>
            </div>

{/* 첨부파일, 가져오는 로직 필요 */}
            <div>
            <h2 className='text-base m-2 text-customTextColor'>첨부파일</h2>
                <p className="w-full h-14 text-base bg-customBackgroundColor p-3 rounded-lg shadow-md border-solid border-2 outline-none transition-transform transform">
                    첨부파일이 없습니다
                    </p>
            </div>
{/* 투표 버튼 */}
            <div className='pt-2 flex justify-center'>
            
            <button className=" w-32 h-10 mx-3 bg-customBlue text-white p-2 rounded-full">투표 정지</button>
            <button className=" w-32 h-10 mx-3 bg-customBlue text-white p-2 rounded-full">투표 수정</button>
            <button className=" w-32 h-10 mx-3 bg-customBlue text-white p-2 rounded-full">투표 알람 전송</button>

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


