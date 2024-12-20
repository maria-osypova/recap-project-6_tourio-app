import styled from "styled-components";
import { useRouter } from "next/router";
import Form from "../components/Form";
import { StyledLink } from "../components/StyledLink";
import useSWR from "swr";

const StyledBackLink = styled(StyledLink)`
  justify-self: flex-start;
`;

export default function CreatePlacePage() {
  const { mutate } = useSWR("/api/places");
  const router = useRouter();
  async function addPlace(placeData) {
    const formData = new FormData(event.target);
    const placeData = Object.fromEntries(formData);

    console.log("adding place");

    const response = await fetch("/api/places", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(placeData),
    });

    if (response.ok) {
      router.push("/");
      mutate();
    }
  }

  return (
    <>
      <h2 id="add-place">Add Place</h2>
      <StyledBackLink href="/">back</StyledBackLink>
      <Form onSubmit={addPlace} formName={"add-place"} />
    </>
  );
}
