// src/firebase/utils.js
import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { db, storage } from "./firebaseConfig";

// Projects
export const getProjects = async (categoryId = null) => {
  try {
    const projectsRef = collection(db, "projects");

    if (!categoryId) {
      const snapshot = await getDocs(projectsRef);
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
      }));
    }

    // Query both categoryId (legacy/primary) and categoryIds (multi-category)
    const q1 = query(projectsRef, where("categoryId", "==", categoryId));
    const q2 = query(
      projectsRef,
      where("categoryIds", "array-contains", categoryId)
    );

    const [snap1, snap2] = await Promise.all([getDocs(q1), getDocs(q2)]);

    // Merge and dedupe results
    const projectMap = new Map();

    const processDoc = (doc) => {
      if (!projectMap.has(doc.id)) {
        projectMap.set(doc.id, {
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate(),
        });
      }
    };

    snap1.docs.forEach(processDoc);
    snap2.docs.forEach(processDoc);

    return Array.from(projectMap.values());
  } catch (error) {
    console.error("Error getting projects:", error);
    return [];
  }
};

export const getProject = async (projectId) => {
  try {
    const docRef = doc(db, "projects", projectId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      };
    } else {
      throw new Error("Project not found");
    }
  } catch (error) {
    console.error("Error getting project:", error);
    throw error;
  }
};

export const addProject = async (projectData, imageFile, zipFile) => {
  try {
    // Upload image first if provided
    let imageUrl = null;
    if (imageFile) {
      const storageRef = ref(
        storage,
        `projects/${Date.now()}_${imageFile.name}`
      );
      await uploadBytes(storageRef, imageFile);
      imageUrl = await getDownloadURL(storageRef);
    }

    // Upload ZIP file if provided
    let downloadUrl = null;
    if (zipFile) {
      const zipStorageRef = ref(
        storage,
        `downloads/${Date.now()}_${zipFile.name}`
      );
      await uploadBytes(zipStorageRef, zipFile);
      downloadUrl = await getDownloadURL(zipStorageRef);
    }

    // Add project to Firestore
    const docRef = await addDoc(collection(db, "projects"), {
      ...projectData,
      imageUrl,
      downloadUrl,
      createdAt: new Date(),
    });

    return docRef.id;
  } catch (error) {
    console.error("Error adding project:", error);
    throw error;
  }
};

// ZIP File upload
export const uploadZipFile = async (zipFile, fileName) => {
  try {
    // Use a timestamped file name to avoid collisions
    const safeName = fileName || `${Date.now()}_${zipFile.name}`;

    // Create a reference to the downloads folder for zip files
    const storageRef = ref(storage, `downloads/${safeName}`);

    // Upload the zip file
    await uploadBytes(storageRef, zipFile);

    // Get the download URL
    const downloadUrl = await getDownloadURL(storageRef);

    return {
      fileName: safeName,
      downloadUrl,
    };
  } catch (error) {
    console.error("Error uploading ZIP file:", error);
    throw error;
  }
};

// Categories
export const getCategories = async () => {
  try {
    const snapshot = await getDocs(collection(db, "categories"));
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error getting categories:", error);
    return [];
  }
};

export const getCategory = async (categoryId) => {
  try {
    const docRef = doc(db, "categories", categoryId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      };
    }
    return null;
  } catch (error) {
    console.error("Error getting category:", error);
    return null;
  }
};

export const getCategoryByDocId = async (docId) => {
  try {
    const docRef = doc(db, "categories", docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      };
    }
    console.log("No such category document!");
    return null;
  } catch (error) {
    console.error("Error getting category:", error);
    return null;
  }
};

// Sample function to populate initial data
export const populateInitialData = async () => {
  try {
    // Add categories
    const categoriesData = [
      {
        id: "react",
        title: "React Projects",
        description: "Web applications built with React",
        bannerImage: "url-to-banner-image",
      },
      {
        id: "native",
        title: "React Native Projects",
        description: "Mobile applications built with React Native",
        bannerImage: "url-to-banner-image",
      },
      // Add more categories as needed
    ];

    // Add sample projects
    const projectsData = [
      {
        title: "E-commerce Dashboard",
        description: "A full-featured admin dashboard",
        categoryId: "react",
        technologies: ["React", "Firebase", "Tailwind CSS"],
        images: [],
        features: [
          "Real-time data updates",
          "Interactive charts",
          "Responsive design",
        ],
        links: {
          github: "https://github.com/username/project",
          live: "https://project-demo.com",
        },
      },
      // Add more projects as needed
    ];

    // Add categories
    for (const category of categoriesData) {
      const { id, ...categoryData } = category;
      await addDoc(collection(db, "categories"), categoryData);
    }

    // Add projects
    for (const project of projectsData) {
      await addDoc(collection(db, "projects"), {
        ...project,
        createdAt: new Date(),
      });
    }

    console.log("Initial data populated successfully");
  } catch (error) {
    console.error("Error populating initial data:", error);
    throw error;
  }
};
