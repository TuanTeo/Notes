import React, {useEffect, useState} from 'react';
import {Button, TextInput} from 'react-native-paper';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {colors, constant} from "../../drawers/constant";
import {observer} from "mobx-react-lite";
import {useUserStore} from "../../stores/userStore";
import {getUserById} from "../../services";
import {logUtils} from "../../utils/logUtils";
import Icon from 'react-native-vector-icons/FontAwesome';

const AccountManagerScreen = observer((props) => {
  const userStore = useUserStore();

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [rePass, setRePass] = useState('');
  const [isChangePass, setIsChangePass] = useState(false);

  useEffect(() => {
    getInfoUserById()
  }, [])

  const getInfoUserById = async () => {
    const res = await getUserById(userStore.user.user_id)
    logUtils('getInfoUserById', res)
    if (res.data) {
      setUserName(res.data.user_name)
      setEmail(res.data.user_email)
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Image
          style={styles.profile}
          source={require('../../assets/images/avatar.png')}
        />
        <Icon style={styles.changeAvatarIcon} name={'camera'} size={25} color={colors.black} />
      </TouchableOpacity>

      <TextInput
        style={styles.text_input}
        label="User name"
        mode="outlined"
        disabled={true}
        value={userName}
        onChangeText={setUserName}
      />
      <TextInput
        style={styles.text_input}
        label="Email"
        mode="outlined"
        disabled={true}
        value={email}
        onChangeText={setEmail}
      />

      {isChangePass ? (
        <View style={{width: '80%'}}>
          <TextInput
            style={styles.text_input_pass}
            label="Password"
            mode="outlined"
            secureTextEntry
            value={pass}
            onChangeText={setPass}
          />
          <TextInput
            style={styles.text_input_pass}
            label="New Password"
            mode="outlined"
            secureTextEntry
            value={pass}
            onChangeText={setPass}
          />
          <TextInput
            style={styles.text_input_pass}
            label="Re-enter new password"
            mode="outlined"
            secureTextEntry
            value={rePass}
            onChangeText={setRePass}
          />
        </View>
      ) : null}

      <View style={styles.button_login_container}>
        {isChangePass ? (
          <Button mode="contained" onPress={() => {
            setIsChangePass(false)
          }}>
            Xác nhận
          </Button>
        ) : (
          <Button mode="contained" onPress={() => {
            setIsChangePass(true)
          }}>
            Đổi mật khẩu
          </Button>
        )}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  text_input: {
    width: '80%',
    marginBottom: 5,
  },
  text_input_pass: {
    marginBottom: 5,
  },
  button_login_container: {
    flexDirection: 'row',
    marginTop: 5,
  },
  profile: {
    marginVertical: constant.SPACING / 2,
    marginRight: constant.SPACING,
    marginLeft: constant.SPACING / 2,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: colors.light,
  },
  changeAvatarIcon: {
    position: "absolute",
    bottom: 25,
    right: 30
  }
});

export default AccountManagerScreen;
