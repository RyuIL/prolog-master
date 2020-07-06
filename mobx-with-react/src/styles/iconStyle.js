import styled from 'styled-components'
import {File} from "styled-icons/boxicons-regular/File"
import { KakaoTalk} from 'styled-icons/remix-fill/KakaoTalk'
import { Github} from 'styled-icons/boxicons-logos/Github'
import {Google} from 'styled-icons/boxicons-logos/Google'
import { Image2 } from "styled-icons/remix-line/Image2";
import {Videos} from "styled-icons/boxicons-solid/Videos"
import {Audiotrack} from "styled-icons/material/Audiotrack"
import { Paperclip} from "styled-icons/feather/Paperclip"
import {Location} from "styled-icons/evil/Location"
import {AlignLeft} from "styled-icons/boxicons-regular/AlignLeft"
import { ArrowBack } from "styled-icons/boxicons-regular/ArrowBack";
import { ColorFill } from "styled-icons/boxicons-solid/ColorFill";
import { PrimitiveDot } from "styled-icons/octicons/PrimitiveDot";
import { LinearScale } from "styled-icons/material/LinearScale";
import { ImageAdd } from "styled-icons/remix-fill/ImageAdd";
import {Edit} from 'styled-icons/boxicons-regular/Edit';

export const KakaoTalkIcon = styled(KakaoTalk)`
  cursor: pointer;
  width: 40px;
  color: black;
`;

export const GithubIcon = styled(Github)`
  cursor: pointer;
  width: 40px;
  color: black;
`;

export const GoogleIcon = styled(Google)`
  cursor: pointer;
  width: 40px;
  color: black;
`;

export const FileIcon = styled(File)`
  cursor: pointer;
  width: 40px;
  color: black;
`;

export const ImageIcon = styled(Image2)`
  cursor: pointer;
  width: 40px;
  color: ${props => props.color};
`;

export const ImageAddIcon = styled(ImageAdd)`
  cursor: pointer;
  width: 40px;
  color: ${props => props.color};
`;


export const VideoIcon = styled(Videos)`
  cursor: pointer;
  width: 40px;
  color: black;
`;

export const AudioIcon = styled(Audiotrack)`
  cursor: pointer;
  width: 40px;
  color: black;
`;

export const PaperclipIcon = styled(Paperclip)`
  cursor: pointer;
  width: 40px;
  color: black;
`;

export const LocationIcon = styled(Location)`
  cursor: pointer;
  width: 40px;
  color: black;
`;

export const AlignLeftIcon = styled(AlignLeft)`
cursor: pointer;
  width: 40px;
  color: black;
`;

export const PrimitiveDotIcon = styled(PrimitiveDot)`
    cursor: pointer;
    width: 12px;
    color: ${props => props.color};
    
`;

export const ColorFillIcon = styled(ColorFill)`
  cursor: pointer;
  width: 40px;
  color: white;
`;
export const ArrowBackIcon = styled(ArrowBack)`
  cursor: pointer;
  margin-top: 2rem;
  margin-left: 2rem;
  color: white;
  width: 50px;
`;

export const HorizontalLineIcon = styled(LinearScale)`
  cursor: pointer;
  width: 40px;
  color: black;
`

export const EditP = styled(Edit)`
    color: #DCDCDC;
    width: 1rem;
    height: 1rem;
    margin-bottom: 2.4rem;
`