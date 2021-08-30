import React from 'react';

import { Text, View, Pressable, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import * as yup from 'yup';

import theme from '../theme';

const initialValues = {
    username: "",
    password: "",
  };

const validationSchema = yup.object().shape({
    username: yup.string()
                .min(3, "Username must be at least 3 characters long")
                .required("Username is required"),
    password: yup.string()
                .min(3, "Password must be at least 3 characters long")
                .required("Password is required"),
});

const styles = StyleSheet.create({
    button: {
      backgroundColor: theme.colors.primary,
      padding : 10,
      margin: 5,
      borderRadius: 5,
      textAlign: "center",
    },
  });

const SignIn = () => {

    const onSubmit = (values) => {
        console.log("LOG", values);
      };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} >
          {({ handleSubmit }) => (
        <View>
            <FormikTextInput name="username" placeholder="Username" />
            <FormikTextInput name="password" placeholder="Password" secureTextEntry />
            <Pressable onPress={handleSubmit} style={styles.button} >
                <Text style={{ color: "white" }} >Sign In</Text>
            </Pressable>
        </View>
        )}
    </Formik>
  );
};

export default SignIn;