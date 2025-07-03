import { router } from 'expo-router';
import { Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

function LoginScreen() {
    return (
      <KeyboardAvoidingView>
        <View style={styles.container}>
            <View style={styles.background1} />
            <Text style={styles.loginText}>Login with</Text>
            

            
            {/* Redesigned Username Input */}
            <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Username</Text>
                <View style={styles.inputFieldContainer}>
                    <TextInput
                        style={styles.inputField}
                        placeholder="Enter your username"
                        placeholderTextColor="#aaa"
                    />
                    <Image style={styles.userIconNew} source={{ uri: "https://static.thenounproject.com/png/630729-200.png" }} />
                </View>
            </View>

            {/* Redesigned Password Input */}
            <View style={[styles.inputWrapper, { top: 630 }]}>
                <Text style={styles.inputLabel}>Password</Text>
                <View style={styles.inputFieldContainer}>
                    <TextInput
                        style={styles.inputField}
                        placeholder="Enter your password"
                        placeholderTextColor="#aaa"
                        secureTextEntry
                    />
                    <Image style={styles.padlockNew} source={{ uri: "https://icons.veryicon.com/png/o/miscellaneous/remitting-country-linear-icon/password-148.png" }} />
                </View>
            </View>

            <TouchableOpacity style={styles.buttonBackground} onPress={() => {'signin'}}>
                <Text style={styles.LoginText}>Log in</Text>
            </TouchableOpacity>
            <Text style={styles.forgotPasswordText}>forgot password</Text>
            {/* <Image style={styles.Vector} source={require("../assets/images/Vector.png")} /> */}
            <Image style={styles.googleIcon} source={require("../assets/images/google-logo.png")} />
            <Image style={styles.facebookIcon} source={require("../assets/images/Facebook.png")} />
            <Image style={styles.appleIcon} source={require("../assets/images/apple.png")} />
            <Text style={styles.noAccountText}>Don’t have an account?</Text>
            <TouchableOpacity onPress={() => router.push('SignIn')}>
                <Text style={styles.createAccountText}>Create an Account</Text>
            </TouchableOpacity>
            <View style={styles.underline3} />
          
        </View>
      </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    position: 'relative',
    backgroundColor: 'white',
    overflow: 'hidden',
    borderRadius: 33,
  },
  background1: {
    width: 395,
    height: 383,
    left: 11,
    top: 478,
    position: 'absolute',
    backgroundColor: '#716AC9',
    opacity: 0.5,
    borderRadius: 57,
  },
  loginText: {
    width: 256,
    height: 69,
    left: 100,
    top: 250,
    position: 'absolute',
    color: 'black',
    fontSize: 48,
    fontFamily: 'Poppins',
    fontWeight: '700', 
  },
 
  inputWrapper: {
    position: 'absolute',
    left: 40,
    top: 520,
    width: 330,
  },
  inputLabel: {
    fontSize: 18,
    color: '#555',
    fontFamily: 'Poppins',
    fontWeight: '600',
    marginBottom: 6,
    marginLeft: 6,
  },
  inputFieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F3F3',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    borderWidth: 1,
    borderColor: '#716AC9',
  },
  inputField: {
    flex: 1,
    fontSize: 17,
    fontFamily: 'Poppins',
    color: '#222',
    paddingVertical: 8,
    backgroundColor: 'transparent',
  },
  userIconNew: {
    width: 24,
    height: 24,
    marginLeft: 8,
    tintColor: '#716AC9',
  },
  padlockNew: {
    width: 22,
    height: 22,
    marginLeft: 8,
    tintColor: '#716AC9',
  },
  buttonBackground: {
    width: 248,
    height: 62,
    left: 90,
    top: 774,
    position: 'absolute',
    backgroundColor: '#716AC9',
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  LoginText: {
    color: 'white',
    fontSize: 36,
    fontFamily: 'Poppins',
    fontWeight: '700',
    textAlign: 'center',
  },
  forgotPasswordText: {
    width: 201,
    height: 25,
    left: 50,
    top: 705,
    position: 'absolute',
    color: '#716AC9',
    fontSize: 15,
    fontFamily: 'Poppins',
    fontWeight: '700',
  },
  googleIcon: {
    width: 70,
    height: 70,
    left: 10,
    top: 365,
    position: 'absolute',
    backgroundColor: 'white', 
    borderRadius: 40, 
  },
  facebookIcon: {
    width: 60,
    height: 60,
    left: 176,
    top: 365,
    position: 'absolute',
  },
  appleIcon: {
    width: 65,
    height: 65,
    left: 330,
    top: 360,
    position: 'absolute',
    },

  Vector:{
    width: 200,
    height: 200,
    left: -115,
    top: 100,
    position: 'absolute',
     transform: [{ rotate: '148deg' }],
     },


  noAccountText: {
    left: 50,
    top: 860,
    position: 'absolute',
    color: 'black',
    fontSize: 12,
    fontFamily: 'Poppins',
    fontWeight: '500',
  },
  createAccountText: {
    left: 250,
    top: 860,
    position: 'absolute',
    color: '#4000FF',
    fontSize: 13,
    fontFamily: 'Poppins',
    fontWeight: '600',
  },
  

  underline3: {
    width: 145,
    height: 8,
    left: 140,
    top:326,
    position: 'absolute',
    backgroundColor: '#716AC9',
  },
});
export default LoginScreen



