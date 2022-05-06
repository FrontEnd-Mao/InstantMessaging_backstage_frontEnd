/* eslint-disable */
export default{
    getUrlKey: function (name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
    },
    timestampToTime: function(timestamp) {
		let newTime = new Date(timestamp);
        let timeMonth = newTime.getMonth() + 1 > 10 ? newTime.getMonth() + 1 : '0' + (newTime.getMonth() + 1)
        let timeDay = newTime.getDay() + 1 > 10 ? newTime.getDay() + 1 : '0' + (newTime.getDay() + 1)
        let timeHours = newTime.getHours() > 10 ? newTime.getHours() + 1 : '0' + newTime.getHours()
        let timeMinutes = newTime.getMonth() > 10 ? newTime.getMonth() : '0' + newTime.getMonth()
        let timeSeconds = newTime.getMonth() > 10 ? newTime.getMonth() : '0' + newTime.getMonth()
		return newTime.getFullYear() + '-' + timeMonth + '-' + timeDay + ' ' + timeHours + ':' + timeMinutes + ':' + timeSeconds;
	},
}