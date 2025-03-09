import {fields} from "../data/fields"

export class ArkaniaChrHexEditor {
    _hexArray
    _isValidChrFile = false

    /**
     * @param {Array.<Number>} uint8array
     * @returns {Array.<String>}
     */
    constructor(uint8array) {
        let hexArray = []
        for (let i in uint8array) {
            hexArray.push((0 + uint8array[i].toString(16)).slice(-2))
        }
        this._hexArray = hexArray
        this._isValidChrFile = this._validateChrFile()
    }

    /**
     * @returns {Boolean}
     */
    get isValidChrFile() {
        return this._isValidChrFile
    }

    exportAsInt8Array() {
        return new Uint8Array(this._hexArray.map(byte => parseInt(byte, 16)));
    }

    /**
     * @param fieldId
     * @returns {boolean|number|string}
     */
    readValue(fieldId) {
        const field = fields[fieldId]
        if (!field) {
            throw `Invalid field ${fieldId}`
        }
        return this._readOffsetValue(field)
    }

    /**
     * @param fieldId
     * @returns {string}
     */
    getLabel(fieldId) {
        const field = fields[fieldId]
        if (!field) {
            throw `Invalid field ${fieldId}`
        }
        return field.label;
    }

    writeValue(newValue, fieldId) {
        const field = fields[fieldId]
        if (!field) {
            throw `Invalid field ${fieldId}`
        }
        if (field.id === 'name') {
            const field2 = fields['name2']
            this._writeOffsetValue({...field2, value: newValue})
        }
        return this._writeOffsetValue({...field, value: newValue})
    }

    /**
     * @returns {Boolean}
     * @private
     */
    _validateChrFile() {
        let name1 = this.readValue('name')
        let name2 = this.readValue('name2')
        return typeof name1 === 'string' && name1.length > 0 && name2 === name1
    }

    /**
     * @param offset Offset
     * @param size Size (in bytes)
     * @returns {number}
     * @private
     */
    _getIntLittleEndian(offset, size) {
        return parseInt('0x' + this._hexArray.slice(offset, offset + size).reverse().join(''), 16)
    }

    /**
     * @param offset Offset
     * @param size Size (in bytes)
     * @returns {number}
     * @private
     */
    _getPortrait(offset, size) {
        return this._hexArray.slice(offset, offset + size)
    }

    /**
     * @param offset Offset
     * @param size Size (in bytes)
     * @returns {number}
     * @private
     */
    _getIntBigEndian(offset, size) {
        return parseInt('0x' + this._hexArray.slice(offset, offset + size).join(''), 16)
    }

    /**
     * @param offset Offset
     * @param size Size (in bytes)
     * @param removePadding Remove empty bytes (0x00) from the end
     * @returns {number}
     */
    _getCharsString(offset, size, removePadding = true) {
        if (!removePadding) {
            return this._hexArray.slice(offset, offset + size)
                .map(hex => String.fromCharCode(parseInt(hex, 16)))
                .join('')
        }

        let bytes = this._hexArray.slice(offset, offset + size).reverse()
        let paddingCount = 0
        for (const i in bytes) {
            if (bytes[i] === '00') {
                ++paddingCount
                continue
            }
            break
        }

        if (paddingCount > 0) {
            return bytes.slice(paddingCount)
                .reverse()
                .map(hex => String.fromCharCode(parseInt(hex, 16)))
                .join('')
        }

        return bytes.reverse()
            .map(hex => String.fromCharCode(parseInt(hex, 16)))
            .join('')
    }

    /**
     * @param offset
     * @param size
     * @param type
     * @returns {boolean|number|string}
     * @private
     */
    _readOffsetValue({offset, size, type}) {
        switch (type) {
            case 'bool':
                return 1 === this._getIntLittleEndian(offset, size)
            case 'char':
                return this._getCharsString(offset, size)
            case 'int':
                switch (size) {
                    case 1:
                        const int8 = this._getIntLittleEndian(offset, size)
                        return int8 < 128 ? int8 : -(256 - int8)
                    case 2:
                        const int16 = this._getIntLittleEndian(offset, size)
                        return int16 < 32768 ? int16 : -(65536 - int16)
                    case 4:
                        const int32 = this._getIntLittleEndian(offset, size)
                        return int32 < 2147483648 ? int32 : -(4294967296 - int32)
                    default:
                        throw `Field getter not defined for type ${type} and size ${size}`
                }
            case 'uint':
                return this._getIntLittleEndian(offset, size)
            case 'portrait':
                return this._getPortrait(offset, size)
            default:
                throw `Field getter not defined for type ${type}`
        }
    }

    /**
     * @param offset
     * @param size
     * @param value
     * @private
     */
    _writeIntLittleEndian(offset, size, value) {
        const newHexValues = parseInt(value, 10).toString(16).padStart(size * 2 , '0').match(/.{2}/g).reverse()
        for (let i = 0, iMax = size; i < iMax; i++) {
            this._hexArray[offset + i] = newHexValues[i]
        }
    }

    /**
     * @param offset
     * @param size
     * @param value
     * @param addPadding
     * @returns {*}
     * @private
     */
    _writeCharsString(offset, size, value, addPadding = true) {
        const chars = value.split('');
        for (let i = 0, iMax = Math.min(size, chars.length); i < iMax; i++) {
            this._hexArray[offset + i] = chars[i].charCodeAt(0).toString(16).padStart(2, '0').match(/.{2}/g)[0]
        }
        if (addPadding && chars.length < size) {
            for (let i = chars.length, iMax = size; i < iMax; i++) {
                this._hexArray[offset + i] = '00';
            }
        }
    }

    // _experimentalWritePortrait() {
    //     // portrait: {id: 'portrait', offset: 0x02da, size: 1024, type: 'portrait', tab: 'portrait', label: 'Portrait'},
    //     let values = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,
    //         42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,
    //         84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,
    //         119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,
    //         150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,
    //         181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,
    //         212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,
    //         243,244,245,246,247,248,249,250,251,252,253,254,255];
    //     let offset = 0x02da;
    //     for (let i = 0, iMax = Math.min(1024, values.length); i < iMax; i++) {
    //         this._hexArray[offset + i] = values[i].toString(16).padStart(2 , '0').match(/.{2}/g)[0];
    //     }
    // }

    _writeOffsetValue({offset, size, type, value}) {
        switch (type) {
            case 'int':
                switch (size) {
                    case 1:
                        const int8 = parseInt(value)
                        this._writeIntLittleEndian(offset, size, int8 < 0 ? 256 + int8 : int8)
                        break
                    case 2:
                        const int16 = parseInt(value)
                        this._writeIntLittleEndian(offset, size, int16 < 0 ? 65536 + int16 : int16)
                        break
                    case 4:
                        const int32 = parseInt(value)
                        this._writeIntLittleEndian(offset, size, int32 < 0 ? 4294967296 + int32 : int32)
                        break
                    default:
                        throw `Field setter not defined for type ${type} and size ${size}`
                }
                break
            case 'uint':
                this._writeIntLittleEndian(offset, size, value)
                break
            case 'char':
                this._writeCharsString(offset, size, value)
                break
            default:
                throw `Field setter not defined for type ${type}`
        }
    }
}
