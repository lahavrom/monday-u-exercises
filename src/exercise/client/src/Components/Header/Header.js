import "./Header.css";

export default function Header({ title, subTitle }) {
  return (
    <>
      <h1 className="title">{title}</h1>
      <sub className="subTitle">{subTitle}</sub>
    </>
  );
}
