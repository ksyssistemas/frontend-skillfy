export async function useFindCaptionOptionByCaptionType(captionType) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_EVALUATION_RULER}/rule-type/${captionType}`);

    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }

    const data = await response.json();

    return data;

  } catch (error) {
    console.error('There was a problem fetching the data:', error);
  }

};

