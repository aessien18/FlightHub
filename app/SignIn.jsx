import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const SignIn = () => {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0.5}
    >
      <View style={styles.container}>
        {/* Backgrounds */}
        <View style={styles.background1} />
        <View style={styles.underline1} />
        <View style={styles.underline2} />
        <View style={styles.underline3} />
        <View style={styles.underline4} />

        {/* Header */}
        <Text style={styles.headerText}>Sign in</Text>

        {/* Labels and Inputs */}
        <Text style={styles.label1}>First name</Text>
        <TextInput style={styles.FnameInput} placeholder="Enter First name" />

        <Text style={styles.label2}>Last name</Text>
        <TextInput style={styles.LnameInput} placeholder="Enter Last name" />

        <Text style={styles.label3}>Email</Text>
        <TextInput style={styles.EmailInput} placeholder="Enter email" />

        <Text style={styles.label4}>Password</Text>
        <TextInput style={styles.PwordInput} placeholder="Enter password" secureTextEntry />

        {/* Button */}
        <TouchableOpacity style={styles.buttonBackground}>
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    overflow: 'hidden',
    borderRadius: 33,
    position: 'relative',
  },
 
  background1: {
    width: 395,
    height: 503,
    position: 'absolute',
    top: 358,
    left: 11,
    borderRadius: 57,
    backgroundColor: '#716AC9',
     opacity: 0.5
  },
  headerText: {
    position: 'absolute',
    top: 250,
    left: 113,
    width: 256,
    height: 69,
    fontSize: 48,
    fontWeight: '700',
    color: 'black',
    fontFamily: 'Poppins',
  },
  buttonBackground: {
    width: 248,
    height: 62,
    position: 'absolute',
    top: 770,
    left: 97,
    borderRadius: 32,
    backgroundColor: '#716AC9',
  },
  buttonText: {
    color: 'white',
    fontSize: 35,
    fontFamily: 'Poppins',
    fontWeight: '700',
    textAlign: 'center',
    padding:10
    
  },
  FnameInput: {
    position: 'absolute',
    width: 380,
    height: 45,
    top: 419,
    left: 36,
    borderRadius: 10,
  },

  
  LnameInput: {
    position: 'absolute',
    width: 380,
    height: 45,
    top: 500,
    left: 36,
    borderRadius: 10,
  },


  EmailInput: {
    position: 'absolute',
    width: 380,
    height: 45,
    top: 578,
    left: 36,
    borderRadius: 10,},


  PwordInput: {
    position: 'absolute',
    width: 380,
    height: 45,
    top: 664,
    left: 36,
    borderRadius: 10,
  },


  label1: {
    position: 'absolute',
    top: 399,
    left: 39,
    fontSize: 15,
    fontWeight: '500',
    color: 'black',
    fontFamily: 'Poppins',
  },
  label2: {
    position: 'absolute',
    top: 480,
    left: 39,
    fontSize: 15,
    fontWeight: '500',
    color: 'black',
    fontFamily: 'Poppins',
  },


  label3: {
    position: 'absolute',
    top: 559,
    left: 41,
    fontSize: 15,
    fontWeight: '500',
    color: 'black',
    fontFamily: 'Poppins',
  },

  label4: {
    position: 'absolute',
    top: 640,
    left: 41,
    fontSize: 15,
    fontWeight: '500',
    color: 'black',
    fontFamily: 'Poppins',
  },

   underline1: {
    width: 350,
    height: 1,
    left: 35,
    top: 451,
    position: 'absolute',
    backgroundColor: '#2A2693',
  },

   underline2: {
    width: 350,
    height: 1,
    left: 35,
    top: 531,
    position: 'absolute',
    backgroundColor: '#2A2693',
  },

   underline3: {
    width: 350,
    height: 1,
    left: 35,
    top: 610,
    position: 'absolute',
    backgroundColor: '#2A2693',
  },

   underline4: {
    width: 350,
    height: 1,
    left: 35,
    top: 695,
    position: 'absolute',
    backgroundColor: '#2A2693',
  },
});

export default SignIn;
