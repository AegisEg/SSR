import LinkX from "next/link";

function Link({ to, children, className }) {
  if (!to) to = "/";
  return (
    <LinkX href={to}>
      <a className={className}>{children}</a>
    </LinkX>
  );
}

export default Link;
