from json import loads, dumps
import io
from contextlib import redirect_stdout
from typing import *
import traceback

__user_code = """{{{ USER_CODE }}}"""
__user_code_filename = "user_submission.py"

# Utilities
def __extractError(e: Exception):
    if isinstance(e, SyntaxError):
        line = getattr(e, "lineno", None)
        end_line = getattr(e, "end_lineno", line)
        column = getattr(e, "offset", None)
        end_column = getattr(e, "end_col_offset", column)
    else:
        tb = traceback.extract_tb(e.__traceback__)
        user_frame = None
        for frame in reversed(tb):
            if frame.filename == __user_code_filename:
                user_frame = frame
                break

        line = user_frame.lineno if user_frame else None
        column = getattr(e, "offset", None)
        end_line = line
        end_column = column

    return {
        "message": "".join(traceback.format_exception_only(type(e), e)).strip("\n"),
        "line": line,
        "end_line": end_line,
        "column": column,
        "end_column": end_column
    }

# Compile user code to capture syntax errors
__root_error = None
try:
    compiled = compile(__user_code, __user_code_filename, "exec")
except Exception as e:
    __root_error = __extractError(e)
    compiled = None

__root_stdout = io.StringIO() # Capture stdout to prevent pollution
if compiled is not None:
    with redirect_stdout(__root_stdout):
        try:
            exec(compiled, globals())
        except Exception as e:
            __root_error = __extractError(e)
            compiled = None

__solution_class_name = "Solution"
__test_cases = loads("""{{{ TEST_CASES }}}""")

def __runTestCase(test_case):
    __captured_stdout = io.StringIO()
    with redirect_stdout(__captured_stdout):
        if len(test_case["operations"]) == 1:
            try:
                method_name = test_case["operations"][0]

                arguments = test_case["arguments"][0]
                
                solution = globals()[__solution_class_name]()
                func = getattr(solution, method_name)
                result = func(*arguments)

                return { 
                    # status will be filled back in the server after validation
                    "result": [result],  # result[i] is the result of operations[i]
                    "error": None, 
                    "stdout": __captured_stdout.getvalue(),
                    "testCase": test_case
                }
            except Exception as e:
                return { 
                    "status": "RUNTIME_ERROR",
                    "result": None, 
                    "error": __extractError(e), 
                    "stdout": __captured_stdout.getvalue(),
                    "testCase": test_case
                }
        else:
            try:
                results = [None] # first result is always the constructor result
                class_name = test_case["operations"][0]
                arguments = test_case["arguments"][0]
                solution = globals()[class_name](*arguments)

                for i in range(1, len(test_case['operations'])):
                    method_name = test_case['operations'][i]
                    arguments = test_case['arguments'][i]

                    func = getattr(solution, method_name)
                    result = func(*arguments)

                    results.append(result)

                return { 
                    # status will be filled back in the server after validation
                    "result": results,
                    "error": None, 
                    "stdout": __captured_stdout.getvalue(),
                    "testCase": test_case
                }
            except Exception as e:
                return { 
                    "status": "RUNTIME_ERROR",
                    "result": None, 
                    "error": __extractError(e), 
                    "stdout": __captured_stdout.getvalue(),
                    "testCase": test_case
                }

if __name__ == "__main__":
    if __root_error:
        print(dumps({ "error": __root_error, "status": "COMPILATION_ERROR", "results": None, "stdout": __root_stdout.getvalue() }))
    else:
        __results = []
        for __test_case in __test_cases:
            __results.append(__runTestCase(__test_case))

        print(dumps({ "error": None, "results": __results, "stdout": __root_stdout.getvalue() }))