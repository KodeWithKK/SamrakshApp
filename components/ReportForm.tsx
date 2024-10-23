import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import * as DocumentPicker from "expo-document-picker";

// Define the Zod validation schema with improved validation
const schema = z.object({
  fullname: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long"),
  gender: z
    .string()
    .min(1, "Gender is required")
    .max(50, "Gender input is too long"),
  age: z
    .string()
    .min(1, "Age is required")
    .regex(/^\d+$/, "Age must be a number")
    .refine((val) => parseInt(val) >= 0 && parseInt(val) <= 150, {
      message: "Age must be between 0 and 150",
    }),
  describe_appearance: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description is too long"),
  last_seen_location: z
    .string()
    .min(5, "Location must be at least 5 characters")
    .max(200, "Location is too long"),
  follow_up_name: z
    .string()
    .min(2, "Contact name must be at least 2 characters")
    .max(100, "Contact name is too long"),
  follow_up_phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^\d{10}$/, "Phone must be exactly 10 digits"),
  file: z
    .object({
      uri: z.string(),
      name: z.string(),
      mimeType: z.string().optional(),
    })
    .optional(),
});

type FormData = z.infer<typeof schema>;

interface FileInfo {
  uri: string;
  name: string;
  mimeType?: string;
}

const ReportForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<FileInfo | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullname: "",
      gender: "",
      age: "",
      describe_appearance: "",
      last_seen_location: "",
      follow_up_name: "",
      follow_up_phone: "",
    },
  });

  const handleFileUpload = async (onChange: (value: any) => void) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: true,
      });

      if (!result.canceled) {
        const fileInfo: FileInfo = {
          uri: result.assets[0].uri,
          name: result.assets[0].name,
          mimeType: result.assets[0].mimeType,
        };
        setSelectedFile(fileInfo);
        onChange(fileInfo);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to pick the file. Please try again.");
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      const formData = new FormData();

      // Safely append text fields
      Object.entries(data).forEach(([key, value]) => {
        if (key !== "file" && value !== undefined) {
          formData.append(key, value.toString());
        }
      });

      // Safely append file if it exists
      if (selectedFile) {
        const fileData = {
          uri: selectedFile.uri,
          type: selectedFile.mimeType || "application/octet-stream",
          name: selectedFile.name,
        };

        // In React Native, we need to cast the file object to any
        formData.append("file", fileData as any);
      }

      // Mock API call
      // Replace this with your actual API endpoint
      console.log("Form Data:", formData);

      Alert.alert("Success", "Form submitted successfully!", [
        {
          text: "OK",
          onPress: () => {
            reset();
            setSelectedFile(null);
          },
        },
      ]);
    } catch (error) {
      console.error("Submit error:", error);
      Alert.alert("Error", "Failed to submit form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderField = (
    name: keyof FormData,
    placeholder: string,
    options: {
      multiline?: boolean;
      keyboardType?: "default" | "numeric";
      numberOfLines?: number;
    } = {}
  ) => (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value } }) => (
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>{placeholder} *</Text>
          <TextInput
            placeholder={`Enter ${placeholder.toLowerCase()}`}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value?.toString()}
            style={[
              styles.input,
              options.multiline && styles.multilineInput,
              errors[name] && styles.inputError,
            ]}
            multiline={options.multiline}
            numberOfLines={options.numberOfLines}
            keyboardType={options.keyboardType || "default"}
          />
          {errors[name] && (
            <Text style={styles.errorText}>{errors[name]?.message}</Text>
          )}
        </View>
      )}
    />
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Report Form</Text>

      {renderField("fullname", "Full Name")}
      {renderField("gender", "Gender")}
      {renderField("age", "Age", { keyboardType: "numeric" })}
      {renderField("describe_appearance", "Appearance Description", {
        multiline: true,
        numberOfLines: 4,
      })}
      {renderField("last_seen_location", "Last Seen Location")}
      {renderField("follow_up_name", "Contact Person Name")}
      {renderField("follow_up_phone", "Contact Phone", {
        keyboardType: "numeric",
      })}

      <Controller
        control={control}
        name="file"
        render={({ field: { onChange } }) => (
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Upload File</Text>
            <TouchableOpacity
              style={styles.fileButton}
              onPress={() => handleFileUpload(onChange)}
            >
              <Text style={styles.fileButtonText}>
                {selectedFile?.name || "Choose File"}
              </Text>
            </TouchableOpacity>
            {errors.file && (
              <Text style={styles.errorText}>{errors.file.message}</Text>
            )}
          </View>
        )}
      />

      <TouchableOpacity
        style={[
          styles.submitButton,
          isSubmitting && styles.submitButtonDisabled,
        ]}
        onPress={handleSubmit(onSubmit)}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.submitButtonText}>Submit Report</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  fieldContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "#333",
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: "top",
  },
  inputError: {
    borderColor: "#ff6b6b",
  },
  errorText: {
    color: "#ff6b6b",
    fontSize: 12,
    marginTop: 4,
  },
  fileButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
  },
  fileButtonText: {
    color: "#666",
  },
  submitButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  submitButtonDisabled: {
    backgroundColor: "#a5d6a7",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default ReportForm;
