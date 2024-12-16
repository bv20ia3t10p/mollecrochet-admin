/* eslint-disable @typescript-eslint/no-explicit-any */
import { getDatabase, ref, get, set, remove, update } from "firebase/database";
import { FirebaseApp } from "../utils/FireBase"; // Ensure Firebase is initialized
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Custom hook to fetch Realtime Database data and handle create, update, delete actions
const useRealtimeDatabaseCollection = (path: string) => {
    const db = getDatabase(FirebaseApp);
    const queryClient = useQueryClient(); // Used for cache invalidation

    const fetchCollection = async () => {
        try {
            const dbRef = ref(db, path); // Reference to the path in Realtime Database
            const snapshot = await get(dbRef); // Get data from the reference
            if (snapshot.exists()) {
                // console.log("Data:", snapshot.val()); // Log the data
                const data = snapshot.val(); // Retrieve the data
                
                // Transform the data to include document names
                const transformedData = Object.entries(data).map(([key, value]) => ({
                    id: key, // Use the document name as the 'id'
                    ...(value as any), // Spread the document's data
                }));
    
                return transformedData; // Return the transformed data
            } else {
                // console.log("No data found at this path.");
                return []; // Return an empty array if no data is found
            }
        } catch (error) {
            console.error("Error fetching Realtime Database data:", error);
            throw error; // Throw error so that React Query can handle it
        }
    };

    // Mutation to create new data (auto-generate ID)

    const createItem = async (newItem: any) => {
        try {
            const dbRef = ref(db, path); // Reference to your path
            const snapshot = await get(dbRef); // Get the data at that path
    
            let newId = 1; // Default ID to 1 if no valid ID is found
            if (snapshot.exists()) {
                const data = snapshot.val();
                const lastKey = Object.keys(data).pop(); // Get the last key (document name)
    
                if (lastKey && !isNaN(Number(lastKey))) {
                    // Check if the last key is a valid number
                    newId = Number(lastKey) + 1; // Convert the key to a number and increment it
                } else {
                    // console.log('Last key is not a valid number');
                }
            }
    
            // Remove the 'id' property from newItem if it exists
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { id, ...itemWithoutId } = newItem;
    
            // Push the new item with the generated ID
            const newRef = ref(db, `${path}/${newId}`); // Use newId as the key for the new item
            await set(newRef, itemWithoutId); // Set the new item without the id property
            return { id: newId, ...itemWithoutId }; // Return the new item with the generated id
        } catch (error) {
            console.error("Error creating item:", error);
            throw error;
        }
    };

    // Mutation to update an existing item
    const updateItem = async (updatedItem: any) => {
        try {
            // console.log(updatedItem); // Log the incoming item for debugging

            // Destructure to exclude the 'id' property
            const { id, ...itemWithoutId } = updatedItem;

            // Reference to the item to update
            const dbRef = ref(db, `${path}/${id}`);
            
            // Update the item at the reference without the 'id' property
            await update(dbRef, itemWithoutId);

            // Return the updated item, reattaching the id for consistency
            return { id, ...itemWithoutId };
        } catch (error) {
            console.error("Error updating item:", error);
            throw error;
        }
    };

    // Mutation to delete an item
    const deleteItem = async (id: string): Promise<void> => {
        try {
            const dbRef = ref(db, `${path}/${id}`); // Reference to the item to delete
            await remove(dbRef); // Remove the item at the reference
        } catch (error) {
            console.error("Error deleting item:", error);
            throw error;
        }
    };

    // Using TanStack Query's useQuery hook to fetch data
    const { data, error, isLoading, refetch } = useQuery({
        queryKey: [path], // Unique query key based on the path
        queryFn: fetchCollection,
    });

    // Mutations for create, update, delete actions
    const createMutation = useMutation({
        mutationFn: createItem,
        onSuccess: () => {
            queryClient.invalidateQueries(path as any); // Invalidate the query to refetch data
        },
    });

    const updateMutation = useMutation({
        mutationFn: updateItem,
        onSuccess: () => {
            queryClient.invalidateQueries(path as any); // Invalidate the query to refetch data
        },
    });

    const deleteMutation = useMutation({
        mutationFn: deleteItem,
        onSuccess: () => {
            queryClient.invalidateQueries(path as any); // Invalidate the query to refetch data
        },
    });

    return {
        data,
        error,
        isLoading,
        refetch,
        createMutation,
        updateMutation,
        deleteMutation,
    };
};

export default useRealtimeDatabaseCollection;
