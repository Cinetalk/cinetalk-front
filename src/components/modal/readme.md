- Modal
  - `isAlertModal:boolean`: alert modal 유무를 확인합니다 (결과에 따라 패딩 값 다름)
  - `onClose:fn`: 모달 닫기 함수
  - `title?:string`: 모바일화면 헤더에 노출될 텍스트
- Modal.TitleWrapper: Modal.Title, Modal.Description 래퍼 컴포넌트
- Modal.Title: 타이틀이 필요한 경우에 사용하세요
- Modal.Description: 설명이 필요한 경우에 사용하세요.
<!-- - Modal.Report: 신고창이 필요한 경우에 사용하세요. -->
- Modal.Login: 로그인이 필요한 경우에 사용하세요
  - `onKakaoLogin:fn`: 카카오 로그인 함수
  - `onNaverLogin:fn`: 네이버 로그인 함수
- Modal.Etc: 이미지/신고 등 추가로 필요한 경우에 사용하세요.
- Modal.Checkbox: 체크박스가 필요한 경우에 사용하세요.
- Modal.CancelButton: 취소 버튼이 필요한 경우에 사용하세요.
- Modal.Button: 액션 버튼이 필요한 경우에 사용하세요.
  - `onClick:fn`
  - `disabled?:boolean` (default = false)

```jsx
{
  isOpen && (
    <Modal isAlertModal={false} onClose={() => setIsOpen(false)}>
      <Modal.TitleWrapper>
        <Modal.Title>정말 씨네톡을 탈퇴 하시겠어요?</Modal.Title>
        <Modal.Description>
          회원님의 톡과 평점은 남지만
          <br />
          씨네톡을 더이상 이용할 수 없어요.
        </Modal.Description>
      </Modal.TitleWrapper>
      <Modal.Login
        onKakaoLogin={() => console.log("d")}
        onNaverLogin={() => console.log("d")}
      />
      <Modal.Etc>
        <Image src={SadSsikongi} alt="SadSsikongi" width={168} height={150} />
      </Modal.Etc>
      <Modal.Checkbox>네, 전부 삭제하고 탈퇴할래요</Modal.Checkbox>
      <Modal.CancelButton>취소</Modal.CancelButton>
      <Modal.Button
        onClick={() => {
          setIsOpen(false);
        }}
      >
        탈퇴하기
      </Modal.Button>
    </Modal>
  );
}
```
