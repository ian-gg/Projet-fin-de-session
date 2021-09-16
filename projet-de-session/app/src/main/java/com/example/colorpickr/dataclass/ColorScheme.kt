package com.example.colorpickr.dataclass

data class ColorScheme (
        val mode: String,
        val colors: Array<Color>
) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as ColorScheme

        if (mode != other.mode) return false
        if (!colors.contentEquals(other.colors)) return false

        return true
    }

    override fun hashCode(): Int {
        var result = mode.hashCode()
        result = 31 * result + colors.contentHashCode()
        return result
    }
}
