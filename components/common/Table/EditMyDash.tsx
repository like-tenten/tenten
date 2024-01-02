import { styled } from 'styled-components';
import { BLUE, GRAY, GREEN, ORANGE, PINK, PURPLE, WHITE } from '@/styles/ColorStyles';
import { FONT_14, FONT_16, FONT_18, FONT_20_B } from '@/styles/FontStyles';
import React, { SetStateAction, useEffect, useState } from 'react';
import DashBoardColor from '../Chip/DashBoardColor';
import Button from '../Button';
import { DEVICE_SIZE } from '@/styles/DeviceSize';
import { GetDashboardListDetailResponseType } from '@/lib/types/dashboards';
import { editDashboard } from '@/api/dashboards/editDashboard';
import { tree } from 'next/dist/build/templates/app-page';

interface Props {
  dashboardData: GetDashboardListDetailResponseType;
}

function EditMyDash({ dashboardData }: Props) {
  const initialColor = dashboardData.color;
  const colors = [GREEN, PURPLE, ORANGE, BLUE, PINK[1]];
  const colorIndex = colors.indexOf(initialColor);
  const [selectedColor, setSelectedColor] = useState('');
  const [isNotActive, setIsNotActive] = useState(true);
  const [dashData, setDashData] = useState(dashboardData);
  const [editName, setEditName] = useState('');

  const OnNameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setEditName(value);
    value === '' ? setIsNotActive(true) : setIsNotActive(false);
  };

  const OnFocusInputHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    setEditName('');
  };

  const handleSubmit = async () => {
    alert('변경이 완료되었습니다.');
    const body = { title: editName, color: selectedColor };
    const response = await editDashboard(dashboardData.id, body);
    setDashData(response);
    setEditName('');
  };

  useEffect(() => {
    setSelectedColor(colors[colorIndex]);
    setDashData(dashboardData);
  }, [colorIndex]);

  return (
    <Wrapper>
      <Container>
        <EditDashChip>
          <BoardTitle>{dashData.title}</BoardTitle>
          <DashBoardColor selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
        </EditDashChip>
        <EditDashName>
          <DashNameText>대시보드 이름</DashNameText>
          <EditNameInputWrap>
            <EditNameInput
              value={editName}
              onChange={OnNameChangeHandler}
              onFocus={OnFocusInputHandler}
              placeholder="뉴프로젝트"
            />
          </EditNameInputWrap>
        </EditDashName>
        <EditButton>
          <ButtonWrapper>
            <Button.Plain style="primary" roundSize="M" onClick={handleSubmit} isNotActive={isNotActive}>
              <ButtonText>변경</ButtonText>
            </Button.Plain>
          </ButtonWrapper>
        </EditButton>
      </Container>
    </Wrapper>
  );
}

export default EditMyDash;

const Wrapper = styled.div`
  width: 620px;
  height: 256px;
  border-radius: 8px;
  background-color: ${[WHITE]};
  padding: 32px 28px;

  @media (max-width: ${DEVICE_SIZE.tablet}) {
    width: 544px;
    height: 256px;
  }

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    width: 284px;
    height: 211px;
    padding: 27px 20px 21px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    gap: 15px;
  }
`;

const EditDashChip = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BoardTitle = styled.div`
  ${[FONT_20_B]}
`;

const EditDashName = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const DashNameText = styled.div`
  ${[FONT_18]}
  @media (max-width: ${DEVICE_SIZE.mobile}) {
    ${[FONT_16]}
  }
`;

const EditNameInputWrap = styled.div`
  width: 100%;
  height: 48px;
  border-radius: 6px;
  border: 1px solid ${[GRAY[30]]};
  padding: 15px 16px;

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    height: 42px;
    padding: 13px 16px;
  }
`;
const EditNameInput = styled.input`
  width: 100%;
`;
const EditButton = styled.div`
  display: flex;
  justify-content: right;
`;

const ButtonWrapper = styled.div`
  width: 84px;
  height: 32px;

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    height: 28px;
  }
`;

const ButtonText = styled.text`
  display: flex;
  width: 84px;
  height: 32px;
  padding: 7px 29px;
  justify-content: center;
  align-items: center;
  ${[FONT_14]}

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    height: 28px;
  }
`;
