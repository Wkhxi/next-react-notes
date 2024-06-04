import { signIn, signOut, auth } from "auth";

function SignIn({ provider, ...props }) {
  return (
    <form
      action={async () => {
        "use server";
        await signIn(provider);
      }}
    >
      <button {...props}>Sign In</button>
    </form>
  );
}

function SignOut(props) {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button {...props}>Sign Out</button>
    </form>
  );
}

export default async function Header() {
  const session = await auth();
  return (
    <header
      className="header"
      style={{ display: "flex", justifyContent: "flex-end" }}
    >
      {session?.user ? (
        <span style={{ display: "flex", alignItems: "center" }}>
          {session?.user.name}
          <SignOut
            style={{
              border: "none",
              background: "#c05889",
              padding: "4px 8px",
              borderRadius: "8px",
            }}
          />
        </span>
      ) : (
        <SignIn
          style={{
            border: "none",
            background: "#c05889",
            padding: "4px 8px",
            borderRadius: "8px",
          }}
        />
      )}
    </header>
  );
}
