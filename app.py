from flask import Flask, jsonify
import requests
import xmltodict
from flask_cors import CORS
import xml.etree.ElementTree as ET

app = Flask(__name__)
CORS(app)

USERNAME = 'EU_COMPSCI'
PASSWORD = 'Tp!4tCSCIru'  
BASE_URL = "https://saprod.emory.edu/PSIGW/RESTListeningConnector/PSFT_SAPROD/ExecuteQuery.v1/public/EU_REST_SR_COMP_SCI_CLASSES/WEBROWSET/NONFILE?isconnectedquery=N&maxrows=10000&prompt_uniquepromptname=BIND1,BIND2&prompt_fieldvalue=5250,5251"

@app.route('/api/courses')
def get_courses():
    try:
        response = requests.get(BASE_URL, auth=(USERNAME, PASSWORD))
        response.raise_for_status()

        data = xmltodict.parse(response.content)
        rows = data.get("QAS_GETQUERYRESULTS_RESP_MSG", {}) \
                   .get("webRowSet", {}) \
                   .get("data", {}) \
                   .get("currentRow", [])

        if isinstance(rows, dict):
            rows = [rows]

        # Map columnValues to fields
        courses = []
        for row in rows:
            values = row.get("columnValue", [])
            if not isinstance(values, list) or len(values) < 18:
                continue
            courses.append({
                "TERM": values[0],
                "CLASS_NBR": values[1],
                "ACAD_CAREER": values[2],
                "ACAD_ORG": values[3],
                "SUBJECT": values[4],
                "CATALOG_NBR": values[5],
                "SECTION": values[6],
                "DESCR": values[7],
                "ENRL_CAP": values[8],
                "ENRL_TOT": values[9],
                "INSTRUCTOR_NAME": values[10],
                "START_DT": values[11],
                "END_DT": values[12],
                "NOTES": values[13],
                "UNITS_MAXIMUM": values[14],
                "GRADING": values[15],
                "TOPIC": values[16],
                "ATTRIBUTES": values[17]
            })

        return jsonify(courses)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)