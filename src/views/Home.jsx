import React from 'react';
import { GiHandBag, GiEarthAfricaEurope, GiGraduateCap } from 'react-icons/gi'
import { FaAssistiveListeningSystems, FaTeamspeak, FaBookReader, FaPen } from 'react-icons/fa'

export default function Home() {

  return (
    <>
      <div className='d-flex justify-content-center pt-4 mb-5'>
        <div className='top'>
          <div className='land-header text-center p-3'>
            <h1><span style={{ color: '#f195aa' }}>IELT</span>SIMULATEXAM</h1>
            <span>Engaging and purpose-driven assessments designed to replicate the IELTS examination experience.</span>
          </div>
        </div>
      </div>
      <div className='about-ielts py-5'>
        <div className='text-center p-4' style={{ color: '#2b2d42' }}>
          <GiGraduateCap style={{ fontSize: '72px', color: '#2b2d42' }} />
          <h2>IELTS for study</h2>
          <p>IELTS is recognised by more than 11,000 education and training providers worldwide.</p>
        </div>
        <div className='text-center p-4' style={{ color: '#2b2d42' }}>
          <GiEarthAfricaEurope style={{ fontSize: '72px', color: '#2b2d42' }} />
          <h2>IELTS for migration</h2>
          <p>Take IELTS to migrate to Australia, Canada, New Zealand and the UK.</p>
        </div>
        <div className='text-center p-4'  style={{ color: '#2b2d42' }}>
          <GiHandBag style={{ fontSize: '72px', color: '#2b2d42' }} />
          <h2>IELTS for work</h2>
          <p>Organisations around the world rely on IELTS to help them select the right people.</p>
        </div>
      </div>
      <div className='formula-exam mb-5 p-5'>
        <div className='formula-exam-left'>
          <div>
            <h3 style={{ color: '#d8003280' }}>IELTS Academic</h3>
            The IELTS Academic test is suitable for those wanting to study in an English-speaking environment or university (higher education).
            You can also take IELTS Academic for professional registration purposes. <br />
            The test measures if you are ready to begin studying in English.
            It features vocabulary that is familiar within an academic setting. <br />
            You can choose whether to take IELTS Academic on paper, on computer or online at home or other suitable location.
          </div>
        </div>
        <div className='formula-exam-right'>
          <div>
            <h3 style={{ color: '#d8003280' }}>IELTS General Training</h3>
            The IELTS General Training test is suitable for those applying to study below degree level. This includes an English-speaking school or college.
            It can also be taken for work experience or other employment training. <br />
            IELTS General Training is also required for migration to Australia, Canada, New Zealand and the UK.
            The test features everyday English language skills that you will need in social and workplace environments. <br />
            IELTS General Training is available to take on paper and on computer only.
          </div>
        </div>
      </div>
      <div className='type-exam py-5'>
        <div className='text-center p-2' style={{ color: '#2b2d42' }}>
          <FaBookReader style={{ fontSize: '72px', color: '#2b2d42', marginBottom: '15px' }} />
          <h2>Reading</h2>
          <p>The IELTS Reading exam assesses your ability to understand and interpret written information from various sources, such as books, articles, and reports.</p>
        </div>
        <div className='text-center p-2' style={{ color: '#2b2d42' }}>
          <FaPen style={{ fontSize: '72px', color: '#2b2d42', marginBottom: '15px' }} />
          <h2>Writing</h2>
          <p>The IELTS Writing exam evaluates your written communication skills, including the ability to express your ideas clearly and coherently in written form.</p>
        </div>
        <div className='text-center p-2'  style={{ color: '#2b2d42' }}>
          <FaAssistiveListeningSystems style={{ fontSize: '72px', color: '#2b2d42', marginBottom: '15px' }} />
          <h2>Listening</h2>
          <p>The IELTS Listening exam measures your capacity to comprehend spoken language in various contexts, such as conversations, lectures, and interviews.</p>
        </div>
        <div className='text-center p-2'  style={{ color: '#2b2d42' }}>
          <FaTeamspeak style={{ fontSize: '72px', color: '#2b2d42', marginBottom: '15px' }} />
          <h2>Speaking</h2>
          {/* <p>Comming Soon</p> */}
          <p>The IELTS Speaking exam evaluates your ability to communicate verbally in English, including your fluency, pronunciation, and ability to express ideas orally.</p>
        </div>
      </div>
    </>
  )
}

