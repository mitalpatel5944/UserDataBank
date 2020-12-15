import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, StyleSheet, ToastAndroid } from 'react-native'
import { colors, images } from '../theme'
import validator from 'validator'
import { AddItem } from '../redux/actions'
import { connect } from 'react-redux'
import { ScrollView } from 'react-native-gesture-handler'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: this.props.userList
        }

    }

    componentDidMount() {
        this.props.navigation.addListener(
            "didFocus",
            this.setData.bind(this)
        );
    }

    setData = () => {

        this.setState({ list: this.props.userList })
    }

    addItem = () => {
        return (
            <TouchableOpacity style={styles.button}
                onPress={() => {
                    this.props.navigation.navigate('AddUser')
                }}>
                <Text style={styles.plus} >{'+'}</Text>
            </TouchableOpacity>
        )
    }

    remove = (index) => {
        let temp = this.props.userList
        console.log("temp", temp);
        temp.splice(index, 1)
        this.props.AddItem(temp)
        this.setState({ list: temp })
    }

    renderlistItem = ({ item, index }) => {
        console.log("item", item);
        return (
            <View style={styles.main}>
                <View>
                    <Text style={styles.namestyle} >{item.gender}</Text>
                    <Text style={styles.namestyle} >{'UserList :'}</Text>
                    {item.userList.map((i, j) => {
                        return (
                            <View style={styles.main}>
                                <Text style={styles.namestyle} >{j + 1 + '.'}</Text>
                                <View>
                                    <Text style={[styles.namestyle, { fontWeight: 'bold' }]} >{i.name}</Text>
                                    <Text style={[styles.namestyle, { width: 180 }]} >{i.email}</Text>
                                </View>
                            </View>
                        )
                    })}
                </View>
                <View>
                    <TouchableOpacity onPress={() => {
                        this.props.navigation.navigate('AddUser', { data: item, isEdited: true, index: index })
                    }}>
                        <Image source={images.edit} style={styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        this.remove(index)
                    }}>
                        <Image source={images.delete} style={styles.icon} />
                    </TouchableOpacity>

                </View>
            </View >
        )
    }

    renderUserList = () => {
        console.log("userList", this.props.userList);
        return (
            <FlatList
                data={this.props.userList}
                renderItem={this.renderlistItem}
                ListEmptyComponent={() => (
                    <Text style={{ alignSelf: 'center', fontSize: 20, fontWeight: 'bold' }}>{'No User Found'}</Text>
                )}
            />
        )
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.addItem()}

                <ScrollView >
                    {this.renderUserList()}
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    console.log("state", state);

    return {
        userList: state.Items.addtoitem,
    }
}
const mapDispatchToProps = (dispatch) => {
    console.log("dispatch", dispatch);

    return {
        AddItem: (item) => {
            dispatch(AddItem(item))
        },
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
    plus: {
        textAlign: 'center',
        paddingHorizontal: 30,
        fontSize: 50,
        padding: 10,
        color: 'white',
    },
    button: {
        position: 'absolute',
        bottom: 20,
        elevation: 3000,
        flexDirection: 'row',
        justifyContent: 'space-between',
        right: 10,
        alignSelf: 'flex-end',
        borderRadius: 150,
        backgroundColor: colors.pink,
        zIndex: 1,
    },
    main: {
        borderWidth: 1, borderRadius: 5, borderColor: colors.pink, padding: 10, margin: 10,
        flexDirection: 'row', justifyContent: 'space-between'
    },
    namestyle: {
        marginLeft: 10,
        fontSize: 20,

    },
    icon: { width: 40, height: 40, tintColor: colors.pink }
})