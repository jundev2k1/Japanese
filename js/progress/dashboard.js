import { $, $$, analysisUtilities as analysisUtil } from "../common/common.js";

export function dashboardProgress() {
    //========= Declare ===========

    //========= Function ===========
    // Lesson Page Function (lesson.html)
    const HandleDashboard = (function () {
        return {
            GetData(){
                const data = {
                    countLesson: analysisUtil.CountLesson(),
                    countTopic: analysisUtil.CountTopic(),
                    countVocabulary: analysisUtil.CountVocabulary()
                };
                return data;
            },
            LoadData() {
                const data = this.GetData();
                $("#lessonAnalysis p").innerHTML = data.countLesson;
                $("#topicAnalysis p").innerHTML = data.countTopic;
                $("#vocabularyAnalysis p").innerHTML = data.countVocabulary;
            },
            init(){
                this.LoadData();
            }
        };
    })();
    // Initialize
    HandleDashboard.init();
}
