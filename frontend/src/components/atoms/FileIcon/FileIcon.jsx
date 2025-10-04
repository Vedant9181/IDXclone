import {
  FaCss3,
  FaHtml5,
  FaJs,
  FaNodeJs,
  FaMarkdown,
  FaGitAlt,
} from "react-icons/fa";
import { GrReactjs } from "react-icons/gr";
import { SiSvg } from "react-icons/si";

export const FileIcon = ({ extension }) => {
  const iconStyle = {
    height: "20px",
    width: "20px",
  };

  const IconMapper = {
    js: <FaJs color="yellow" style={iconStyle} />,
    jsx: <GrReactjs color="#61dbfa" style={iconStyle} />,
    css: <FaCss3 color="#3c99dc" style={iconStyle} />,
    html: <FaHtml5 color="#e34c26" style={iconStyle} />,
    json: <FaNodeJs color="#28a146" style={iconStyle} />,
    md: <FaMarkdown color="#ffffff" style={iconStyle} />,
    gitignore: <FaGitAlt color="#f1502f" style={iconStyle} />,
    svg: <SiSvg color="#f1502f" style={iconStyle} />,
  };

  return <>{IconMapper[extension]}</>;
};
