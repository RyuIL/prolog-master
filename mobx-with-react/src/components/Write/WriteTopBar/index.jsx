import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { SketchPicker } from "react-color";
import { ArrowBackIcon, PrimitiveDotIcon } from "../../../styles/iconStyle.js";
import { inject, observer } from "mobx-react";
import axios from "axios";

const blackColor = "#a6a6a6";
const redColor = "#ff9999";
const greenColor = "#66cc99";
const blueColor = "#9494d1";
const yellowColor = "#ac7339";
const color10 = "#555555";
const color9 = "#A97857";
const color8 = "#536B82";

const WriteTopBar = ({
  title,
  coverColor,
  coverImage,
  changeTitle,
  changeCoverColor,
  changeCoverImage,
  postCode
}) => {
  const [color, setColor] = useState(coverColor);
  const [backgroundImage, setBackgroundImage] = useState(coverImage);
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const onCircleClick = color => {
    setColor(color);
    changeCoverColor(color);
  };
  const BlackClick = () => onCircleClick(blackColor);
  const RedClick = () => onCircleClick(redColor);
  const GreenClick = () => onCircleClick(greenColor);
  const BlueClick = () => onCircleClick(blueColor);
  const YellowClick = () => onCircleClick(yellowColor);
  const color8Click = () => onCircleClick(color8);
  const color9Click = () => onCircleClick(color9);
  const color10Click = () => onCircleClick(color10);

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleChange = color => {
    setColor(color.hex);
    changeCoverColor(color.hex);
  };

  const popover = {
    position: "relative",
    marginRight: "200px"
  };
  const cover = {
    position: "fixed",
    top: "0px",
    right: "0px",
    bottom: "0px",
    left: "0px"
  };

  const onChangeHandler = event => {
    onFileTransmit(event.target.files[0]);
  };

  const onFileTransmit = file => {
    const data = new FormData();
    if (file) {
      data.append("upload", file);
      axios
        .post("http://i02a410.p.ssafy.io:8080/v1/file", data, {
          headers: { "X-AUTH-TOKEN": window.sessionStorage.getItem("jwt") }
        })
        .then(res => {
          if (res.data.uploaded === true) {
            setBackgroundImage(res.data.url);
            changeCoverImage(res.data.url);
          } else {
            alert("이미지 업로드에 실패하였습니다.");
          }
        });
    }
  };

  const onClickHandler = () => {
    const idReference = document.getElementById("fileupload");
    idReference.click();
  };

  return (
    <WriteTopBarLayout color={color} image={backgroundImage}>
      {/* TODO 뒤로가기가 되어야함. 메인으로 가는게 아니라 */}
      <Link to={"/"} style={{ textDecoration: "none" }}>
        <ArrowBackIcon></ArrowBackIcon>
      </Link>

      <HeaderDiv>
        {postCode === undefined ? (
          <HeaderInput
            placeholder="제목을 입력하세요"
            color={color}
            value={title}
            onChange={changeTitle}
          />
        ) : (
          <HeaderInput
            placeholder={title}
            color={coverColor}
            value={title}
            onChange={changeTitle}
          />
        )}
      </HeaderDiv>
      <ColorDots>
        <ColorDiv>
          <PrimitiveDotIcon color={"white"} onClick={handleClick} />
          {displayColorPicker ? (
            <div style={popover}>
              <div style={cover} onClick={handleClose} />
              <SketchPicker color={color} onChange={handleChange} />
            </div>
          ) : null}
        </ColorDiv>
        <ColorDiv>
          <PrimitiveDotIcon color={"#a6a6a6"} onClick={BlackClick} />
        </ColorDiv>
        <ColorDiv>
          <PrimitiveDotIcon color={"#ff9999"} onClick={RedClick} />
        </ColorDiv>
        <ColorDiv>
          <PrimitiveDotIcon color={"#66cc99"} onClick={GreenClick} />
        </ColorDiv>
        <ColorDiv>
          <PrimitiveDotIcon color={"#9494d1"} onClick={BlueClick} />
        </ColorDiv>
        <ColorDiv>
          <PrimitiveDotIcon color={"#ac7339"} onClick={YellowClick} />
        </ColorDiv>
        <ColorDiv>
          <PrimitiveDotIcon color={"#536B82"} onClick={color8Click} />
        </ColorDiv>
        <ColorDiv>
          <PrimitiveDotIcon color={"#A97857"} onClick={color9Click} />
        </ColorDiv>
        <ColorDiv>
          <PrimitiveDotIcon color={"#555555"} onClick={color10Click} />
        </ColorDiv>
      </ColorDots>
      <div style={{float: "right", margin:"2em"}}>
        <input type="file" id="fileupload" onChange={onChangeHandler} style={{display:"none"}} />
        <UploadBtn onClick={onClickHandler}>이미지</UploadBtn>
      </div>
    </WriteTopBarLayout>
  );
};

const ColorDiv = styled.div`
  width: 2rem;
  float: left;
  text-align: center;
`;

const ColorDots = styled.div`
  width: 18rem;
  height: 2rem;
  margin-top: 12rem;
  position: absolute;
  margin-left: 33%;
`;

const HeaderDiv = styled.div`
  text-align: center;
  transform: translate(50%, -50px);
  -webkit-transform: translate(50%, -50px);
  position: absolute;
  z-index: 11;
  width: 100%;
  height: 100px;
  right: 50%;
  margin-top: 8rem;
  background-color: ${props => props.color};
`;

const HeaderInput = styled.input`
  font-family: Inconsolata;
  font-size: 34pt;
  border-color: transparent;
  background: inherit;
  color: white;
  :focus {
    outline: none;
  }
`;

const WriteTopBarLayout = styled.div`
  height: 20rem;
  position: relative;
  background-color: ${props => props.color};
  background-image: url(${props => props.image});
  background-size: cover;
  background-repeat: no-repeat;
  -moz-transition: all 0.2s ease-in;
  -o-transition: all 0.2s ease-in;
  -webkit-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
`;

const UploadBtn = styled.div`
  border-radius: 5px;
  border-color: black;
  border: 1px solid black;
  color: black;
  cursor: pointer;
  height: 30px;
  width: 60px;
  background-color: white;
  float: right;
  margin-top: 1%;
  margin-right: 1%;
  text-align: center;
  padding-top: 3px;
`;

export default inject(({ postStore, authStore }) => ({
}))(observer(WriteTopBar));
