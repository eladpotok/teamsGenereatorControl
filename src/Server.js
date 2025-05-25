const isLocal =  false

const realService = 'https://teamsgeneratorwebapi20230420202750.azurewebsites.net'
const localEnv = "https://localhost:7236"
export const serviceToUse = isLocal ? localEnv : realService
export const PartitionKeyOfUpdates = "2c607f3d-d645-41a5-ad4f-c96ab9737780"
export const PartitionKeyOfFeedbacks = "1dc15213-2060-4863-9cb1-0167c919c093"

export async function addUpdate(update){
    const response = await fetch(`${serviceToUse}/ControlPanel/AddUpdate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'  },
        body: JSON.stringify(update),
    })
    if (response.ok) {
        return true
    }
    return false
}

export async function getAllUpdates(){
    try {
        const response = await fetch(`${serviceToUse}/ControlPanel/getAllUpdates?partitionKey=${PartitionKeyOfUpdates}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'  },
        })
        if (response.ok) {
            return response.json()
        }
        return null
    }
    catch (error) {
        console.error('Error fetching updates:', error);
        return null;
    }
}

export const submitFeedback = async (feedback) => {
    try {
        const response = await fetch(`${serviceToUse}/ControlPanel/AddFeedback`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'  },
            body: JSON.stringify(feedback),
        })
        if (response.ok) {
            return true
        }
        return false
    }
    catch (error) {
        console.error('Error adding feedback:', error);
        return null;
    }
  };

  export const deleteUpdate = async (update) => {
    try {
        const response = await fetch(`${serviceToUse}/ControlPanel/DeleteUpdate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'  },
            body: JSON.stringify(update),
        })
        if (response.ok) {
            return true
        }
        return false
    }
    catch (error) {
        console.error('Error delete update:', error);
        return null;
    }
  };

  
  export const deleteFeedback = async (feedback) => {
    try {
        const response = await fetch(`${serviceToUse}/ControlPanel/DeleteFeedback`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'  },
            body: JSON.stringify(feedback),
        })
        if (response.ok) {
            return true
        }
        return false
    }
    catch (error) {
        console.error('Error delete feedback:', error);
        return null;
    }
  };
  
  export async function getAllFeedbacks() {
    try {
        const response = await fetch(`${serviceToUse}/ControlPanel/GetAllFeedbacks?partitionKey=${PartitionKeyOfFeedbacks}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'  },
        })
        if (response.ok) {
            return response.json()
        }
        return null
    }
    catch (error) {
        console.error('Error read feedback:', error);
        return null;
    }
  }
  