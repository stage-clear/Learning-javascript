// 必要なモジュールを読み込む
import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Text, View } from 'react-native'

// メインコンポーネントの定義
export default class TestNative extends Component {
  render () {
    const msg = 
      '石を捨てるのに時があり\n' + 
      '石を集めるのに時がある'

    return (
      <View style={styles.base}>
        <Text style={styles.title}>{msg}</Text>
      </View>
    )
  }
}

// スタイルの設定
const styles = StyleSheet.create({
  base: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0ff'
  },
  title: {
    fontSize: 46
  }
})

// アプリにコンポーネントを登録
AppRegistry.regsiterComponent('TestNative', () => TestNative)
