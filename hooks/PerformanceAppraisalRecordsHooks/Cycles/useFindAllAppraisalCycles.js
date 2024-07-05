export async function useFindAllAppraisalCycles() {
  console.log(process.env.NEXT_PUBLIC_DEPARTMENT);
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APPRAISAL_CYCLE}`);

    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }

    const data = await response.json();
    console.log("DATA: ", data)
    return data;

  } catch (error) {
    console.error('There was a problem fetching the data:', error);
  }

};

