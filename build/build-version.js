/*
 * Tencent is pleased to support the open source community by making
 * 蓝鲸智云PaaS平台社区版 (BlueKing PaaS Community Edition) available.
 *
 * Copyright (C) 2021 THL A29 Limited, a Tencent company.  All rights reserved.
 *
 * 蓝鲸智云PaaS平台社区版 (BlueKing PaaS Community Edition) is licensed under the MIT License.
 *
 * License for 蓝鲸智云PaaS平台社区版 (BlueKing PaaS Community Edition):
 *
 * ---------------------------------------------------
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
 * documentation files (the "Software"), to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
 * to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of
 * the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
 * THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
 * CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
*/

/**
 * @file build version
 *
 * Copyright © 2012-2019 Tencent BlueKing. All Rights Reserved. 蓝鲸智云 版权所有
 */

const { join, basename } = require('path')
const cpx = require('cpx')
const semver = require('semver')
const rm = require('rimraf')

const pkg = require('../package.json')

// bk-magic-vue npm verson 直接从 2 开始
const majorVer = semver.major(pkg.version)
const distDirName = `${majorVer}.0`
const distTarget = join(__dirname, `../${distDirName}`)
const libTarget = join(__dirname, `../${distDirName}/lib`)

rm(distTarget, e => {
    if (e) {
        throw e
    }

    cpx.copy(join(__dirname, '../dist/**'), distTarget, { includeEmptyDirs: true }, err => {
        if (err) {
            console.log(err)
            process.exit(1)
        }
        console.log(`copy dist to ${basename(distTarget)} done`)
    })

    cpx.copy(join(__dirname, '../lib/**'), libTarget, { includeEmptyDirs: true }, err => {
        if (err) {
            console.log(err)
            process.exit(1)
        }
        console.log(`copy lib to ${basename(distTarget)} done`)
    })
    console.log(`majorVer:${distDirName}`)
})
