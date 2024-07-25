import React from 'react';
import { Link } from 'react-router-dom';
const VoteCreatePage: React.FC = () => {

    const Contents = () =>  {
        return (
            // 백엔드로 POST 요청 보내는 로직 필요
            //투표 생성 버튼 누를 시 투표 생성 구현 필요
        <form>
        {/* 제목 */}
            <div>

            <h2 className='text-base m-2 text-customTextColor'>제목</h2>
            <input
                name="title"
                type="text"
                className="w-full h-14 bg-customBackgroundColor text-base px-4 rounded-lg shadow-md border-solid border-2 outline-none transition-transform transform"
                placeholder="제목을 입력해 주세요"
                autoComplete="off"
                required
                />
            </div>
        {/* 내용 */}
            <div>
            <h2 className='text-base m-2 text-customTextColor'>내용</h2>
            <textarea
            name="contents"
            className="w-full h-[350px]  bg-customBackgroundColor resize-none text-base px-4 py-2 rounded-lg shadow-md border-solid border-2 outline-none transition-transform transform"
            placeholder="제목을 입력해 주세요"
            autoComplete="off"
            required
            />
            </div>
        {/* 투표버튼 및 투표 기간 */}
            <div className='flex justify-between pt-2'>
                {/* 투표버튼 부분 */}
                <div>   
                <button 
                    name='addAgreeVote'
                    className="w-32 h-10 rounded-lg border-2	text-xs	 mx-4 transition-transform transform"
                    type='button'
                    >
                    찬반 투표 추가
                </button>
                <button
                    name='addSelectVote'
                    className="w-32 h-10 rounded-lg border-2	text-xs	 mx-4 transition-transform transform"
                    type='button'
                    
                    >
                    선택형 투표 추가
                </button>
                    </div>
                {/* 투표 기간 부분 */}
                <div>
                <span className='text-xs mx-4'>
                    투표 기간 :
                </span>
                <input
                    name='voteStart'
                    className="w-32 h-10 p-2 rounded-full border-2 text-sm transition-transform transform"
                    type='date'
                    required
                    >
                </input>
                <span className='mx-2 text-sm'>
                    ~
                </span>
                <input
                    name='voteEnd'
                    className="w-32 h-10 p-2 rounded-full border-2 text-sm transition-transform transform"
                    type='date'
                    required
                    >
                </input>
                </div>
            </div>

{/* 첨부파일 등록 input */}
            <div>
            <h2 className='text-base m-2 text-customTextColor'>첨부파일</h2>
            <input
                name="file"
                type="file"
                className="w-full h-14 text-base bg-customBackgroundColor p-3 rounded-lg shadow-md border-solid border-2 outline-none transition-transform transform"
                placeholder="첨부파일이 없습니다"
                />
            </div>
{/* 투표 등록 버튼 */}
            <div className='pt-2 flex justify-end'>
                
                <button 
                name='submitVote'
                type="submit"
                className="w-32 h-10 bg-customBlue text-white rounded-lg transition-transform transform hover:bg-customBlue hover:scale-105"
                id="submit"
                >
                작성하기
                </button>
            </div>
        </form>
        )
    }

  return (
      <div className="p-8">
      <div className="">
        <div className="flex justify-start p-5">
            <Link to='/vote/active' className='text-3xl	font-semibold'> ← </Link>

            <h3 className='text-3xl	font-semibold'>투표 생성</h3>
        </div>

        <div className="min-w-full min-h-[700px] p-6 bg-white border rounded-[20px] overflow-hidden">
            <Contents/>
        </div>
      </div>
    </div>
  );
};

export default VoteCreatePage;
