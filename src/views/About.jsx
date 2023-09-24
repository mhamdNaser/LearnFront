import React from "react";

export default function About() {
  return (
    <div className="container py-4">
      <h2 style={{ color: "#2b2d42" }}>What is IELTS?</h2>
      <p>
        The International English Language Testing System (IELTS) is designed to
        help you work, study or migrate to a country where English is the native
        language. This includes countries such as Australia, Canada, New
        Zealand, the UK and USA. Your ability to listen, read, write and speak
        in English will be assessed during the test. IELTS is graded on a scale
        of 1-9. IELTS is jointly owned by the British Council; IDP IELTS; and
        Cambridge University Press & Assessment.
      </p>
      <h2 style={{ color: "#2b2d42" }}>Why take IELTS?</h2>
      <p>
        If you are looking to work, live or study in an English-speaking
        country, then you must be able to demonstrate a high level of English
        language ability. English is the third most spoken language in the
        world, with 379 million speakers worldwide. Being able to communicate in
        the native language of the country you wish to work or study in, has a
        wide range of benefits. It is also essential for job opportunities as
        well as integration into the community. IELTS is the most popular test
        for those looking to migrate to Australia, Canada, New Zealand and the
        UK. It is globally recognised by more than 11,000 employers,
        universities, schools and immigration bodies including 3,400
        institutions in the USA.
      </p>
      <h4 style={{ color: "#2b2d42" }}>IELTS score scale</h4>
      <table className="table table-striped mt-3">
        <thead>
          <tr className="table-dark">
            <th scope="col">Band score</th>
            <th scope="col">Skill level</th>
            <th scope="col">Description </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row" className="ps-4">
              9
            </th>
            <td>Expert user</td>
            <td>
              The test taker has fully operational command of the language.
              Their use of English is appropriate, accurate and fluent, and
              shows complete understanding.
            </td>
          </tr>
          <tr>
            <th scope="row" className="ps-4">
              8
            </th>
            <td>Very good user</td>
            <td>
              The test taker has fully operational command of the language with
              only occasional unsystematic inaccuracies and inappropriate usage.
              They may misunderstand some things in unfamiliar situations. They
              handle complex and detailed argumentation well.
            </td>
          </tr>
          <tr>
            <th scope="row" className="ps-4">
              7
            </th>
            <td>Good user</td>
            <td>
              The test taker has operational command of the language, though
              with occasional inaccuracies, inappropriate usage and
              misunderstandings in some situations. They generally handle
              complex language well and understand detailed reasoning.
            </td>
          </tr>
          <tr>
            <th scope="row" className="ps-4">
              6
            </th>
            <td>Competent user</td>
            <td>
              The test taker has an effective command of the language despite
              some inaccuracies, inappropriate usage and misunderstandings. They
              can use and understand fairly complex language, particularly in
              familiar situations.
            </td>
          </tr>
          <tr>
            <th scope="row" className="ps-4">
              5
            </th>
            <td>Modest user</td>
            <td>
              The test taker has a partial command of the language and copes
              with overall meaning in most situations, although they are likely
              to make many mistakes. They should be able to handle basic
              communication in their own field.
            </td>
          </tr>
          <tr>
            <th scope="row" className="ps-4">
              4
            </th>
            <td>Limited user</td>
            <td>
              The test taker's basic competence is limited to familiar
              situations. They frequently show problems in understanding and
              expression. They are not able to use complex language.
            </td>
          </tr>
          <tr>
            <th scope="row" className="ps-4">
              3
            </th>
            <td>Extremely limited user</td>
            <td>
              The test taker conveys and understands only general meaning in
              very familiar situations. There are frequent breakdowns in
              communication.
            </td>
          </tr>
          <tr>
            <th scope="row" className="ps-4">
              2
            </th>
            <td>Intermittent user</td>
            <td>
              The test taker has great difficulty understanding spoken and
              written English.
            </td>
          </tr>
          <tr>
            <th scope="row" className="ps-4">
              1
            </th>
            <td>Non-user</td>
            <td>
              The test taker has no ability to use the language except a few
              isolated words.
            </td>
          </tr>
          <tr>
            <th scope="row" className="ps-4">
              0
            </th>
            <td>Did not attempt the test</td>
            <td>The test taker did not answer the questions.</td>
          </tr>
        </tbody>
      </table>
      <h2 style={{ color: "#2b2d42" }}>What IELTS score do I need?</h2>
      <p>
        The higher you can score in your IELTS, reflects a better understanding
        and ability to communicate in English. Each immigration body,
        university, workplace or institution will have specific IELTS score
        requirements. The score you need will depend on what you are looking to
        do in the country, i.e work or study.
      </p>
      <h2 style={{ color: "#2b2d42" }}>How IELTS is developed</h2>
      <p>
        IELTS is developed to provide a fair and accurate assessment of English
        language proficiency. Test questions are developed by language
        specialists from Australia, Canada, New Zealand, the UK and the USA. The
        test covers four sections: Listening, Reading, Writing and Speaking.
        IELTS test content reflects everyday situations. It is unbiased and fair
        to all test takers from all backgrounds.
      </p>
    </div>
  );
}
