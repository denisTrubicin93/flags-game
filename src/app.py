import asyncio
import websockets
import json
from threading import Timer

connected = set()


async def server(websocket, path):

    async for message in websocket:
        print(message)
        cmd = json.loads(message)
        if cmd['cmd'] == 'flag_start':
            dict_data = {
                'cmd': 'event',
                'result': {'event': 'flag', 'result': 1, 'score': 0.4, 'image': 'base64ed'}
            }
            # dict_data = {
            #     'event': 'flag', 'result': True, 'num_pose': 0, 'image': 'base64ed'
            # }

            await websocket.send(json.dumps(dict_data))
        if cmd['cmd'] == 'flag_restart':
            dict_data = {
                'cmd': 'event',
                'result': {'event': 'flag', 'result': 3, 'score': 0.4, 'image': 'base64ed'}
            }
            # dict_data = {
            #     'event': 'flag', 'result': True, 'num_pose': 0, 'image': 'base64ed'
            # }

            await websocket.send(json.dumps(dict_data))
        if cmd['cmd'] == 'squat_start':
            dict_data = {
                'cmd': 'event',
                'result': {'event': 'squat', 'result': False, 'is_upper': 'is_upper', 'is_lower': False, 'image': 'base64ed'}
            }
            # dict_data = {
            #     'event': 'squat', 'result': True, 'is_upper': 'is_upper', 'is_lower': 'is_lower', 'image': 'base64ed'
            # }
            await websocket.send(json.dumps(dict_data))
        if cmd['cmd'] == 'add_squat':
            dict_data = {
                'cmd': 'event',
                'result': {'event': 'squat', 'result': True, 'is_upper': 'is_upper', 'is_lower': True, 'image': 'base64ed'}
            }
            # dict_data = {
            #     'event': 'squat', 'result': True, 'is_upper': 'is_upper', 'is_lower': 'is_lower', 'image': 'base64ed'
            # }
            await websocket.send(json.dumps(dict_data))


# r = Timer(10.0, nArgs, (websocket, path,3))
# r.start()

start_server = websockets.serve(server, "localhost", 1234)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
